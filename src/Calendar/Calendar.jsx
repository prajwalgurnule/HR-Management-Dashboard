import { useState, useEffect } from 'react';
import { FiCalendar, FiPlus, FiChevronLeft, FiChevronRight, FiX, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, addDays, getYear, getDay } from 'date-fns';
import './Calendar.css';

// Helper functions for localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today); // Current month
  const [selectedDate, setSelectedDate] = useState(today); // Today's date
  const [showEventModal, setShowEventModal] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [loadingHolidays, setLoadingHolidays] = useState(false);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: format(today, 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '10:00',
    type: 'meeting',
    location: '',
    participants: ''
  });

  // Load events and tasks from localStorage on component mount
  const [events, setEvents] = useState(() => 
    loadFromLocalStorage('calendarEvents', [
      {
        id: 1,
        title: 'Team Standup',
        date: format(today, 'yyyy-MM-dd'),
        startTime: '09:30',
        endTime: '10:00',
        type: 'meeting',
        participants: ['John', 'Sarah', 'Mike']
      },
      {
        id: 2,
        title: 'Project Deadline',
        date: format(addMonths(today, 1), 'yyyy-MM-dd'),
        startTime: '17:00',
        endTime: '17:30',
        type: 'deadline',
        description: 'Submit final project deliverables'
      }
    ])
  );

  const [tasks, setTasks] = useState(() => 
    loadFromLocalStorage('calendarTasks', [
      {
        id: 1,
        title: 'Review design mockups',
        dueDate: format(addDays(today, 3), 'yyyy-MM-dd'),
        completed: false,
        priority: 'high'
      },
      {
        id: 2,
        title: 'Prepare quarterly report',
        dueDate: format(addDays(today, 7), 'yyyy-MM-dd'),
        completed: false,
        priority: 'medium'
      }
    ])
  );

  // Fetch holidays when month changes
  useEffect(() => {
    const fetchHolidays = async () => {
      setLoadingHolidays(true);
      try {
        const year = getYear(currentMonth);
        const response = await fetch(
          `https://calendarific.com/api/v2/holidays?&api_key=JnUXpo26rIB0YUKQK7GUZHMivkkqxvTw&country=IN&year=${year}`
        );
        const data = await response.json();
        if (data.response && data.response.holidays) {
          setHolidays(data.response.holidays);
        }
      } catch (error) {
        console.error('Error fetching holidays:', error);
      } finally {
        setLoadingHolidays(false);
      }
    };
    
    fetchHolidays();
  }, [currentMonth]);

  // Save to localStorage whenever events or tasks change
  useEffect(() => {
    saveToLocalStorage('calendarEvents', events);
  }, [events]);

  useEffect(() => {
    saveToLocalStorage('calendarTasks', tasks);
  }, [tasks]);

  // Calendar navigation functions
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Get days for current month view with proper alignment
  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDay = getDay(monthStart); // 0 = Sunday, 1 = Monday, etc.
    
    const days = [];
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Add empty blocks for days before the first day of month
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="day-cell min-h-24 p-1 rounded-lg opacity-20">
          <div className="day-number flex justify-end">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full">
              {''}
            </span>
          </div>
        </div>
      );
    }

    // Add actual days of the month
    monthDays.forEach((day, i) => {
      const dayEvents = getEventsForDate(day);
      const dayHolidays = getHolidaysForDate(day);
      const dayTasks = getTasksForDate(day);
      const isSelected = isSameDay(day, selectedDate);
      const isToday = isSameDay(day, today);

      days.push(
        <div
          key={i}
          onClick={() => handleDateClick(day)}
          className={`day-cell min-h-24 p-1 rounded-lg transition-all ${
            isSelected ? 'ring-2 ring-indigo-500 bg-indigo-50' : 
            isToday ? 'bg-red-50' : 'hover:bg-gray-50'
          }`}
        >
          <div className="day-number flex justify-end">
            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
              isToday ? 'bg-red-500 text-white font-bold' : ''
            }`}>
              {format(day, 'd')}
            </span>
          </div>
          <div className="day-events mt-1 space-y-1 overflow-hidden">
            {dayHolidays.slice(0, 2).map(holiday => (
              <div 
                key={holiday.name}
                className="event-preview text-xs px-1 py-0.5 rounded bg-purple-100 text-purple-800 truncate"
              >
                🎉 {holiday.name}
              </div>
            ))}
            {dayEvents.slice(0, 2).map(event => (
              <div 
                key={event.id}
                className={`event-preview text-xs px-1 py-0.5 rounded truncate ${
                  getEventColor(event.type)
                }`}
              >
                {event.title}
              </div>
            ))}
            {dayTasks.slice(0, 2).map(task => (
              <div 
                key={task.id}
                className={`task-preview text-xs px-1 py-0.5 rounded truncate ${
                  task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {task.completed ? '✓ ' : ''}{task.title}
              </div>
            ))}
            {(dayEvents.length + dayTasks.length + dayHolidays.length) > 2 && (
              <div className="more-items text-xs text-gray-500 text-center">
                +{dayEvents.length + dayTasks.length + dayHolidays.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    });

    return days;
  };

  // Handle adding new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    
    if (newEvent.endTime <= newEvent.startTime) {
      alert('End time must be after start time');
      return;
    }
    
    const participantsArray = newEvent.participants 
      ? newEvent.participants.split(',').map(p => p.trim())
      : [];
    
    const newEventObj = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      type: newEvent.type,
      ...(newEvent.location && { location: newEvent.location }),
      ...(participantsArray.length > 0 && { participants: participantsArray })
    };
    
    setEvents([...events, newEventObj]);
    setShowEventModal(false);
    resetNewEvent();
  };

  const resetNewEvent = () => {
    setNewEvent({
      title: '',
      date: format(selectedDate, 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '10:00',
      type: 'meeting',
      location: '',
      participants: ''
    });
  };

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Get events for selected date
  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  // Get holidays for selected date
  const getHolidaysForDate = (date) => {
    return holidays.filter(holiday => 
      isSameDay(parseISO(holiday.date.iso), date)
    );
  };

  // Get tasks for selected date
  const getTasksForDate = (date) => {
    return tasks.filter(task => isSameDay(parseISO(task.dueDate), date));
  };

  // Handle date selection
  const handleDateClick = (day) => {
    setSelectedDate(day);
    setNewEvent(prev => ({
      ...prev,
      date: format(day, 'yyyy-MM-dd')
    }));
  };

  // Format time range for display
  const formatTimeRange = (startTime, endTime) => {
    return `${startTime} - ${endTime}`;
  };

  // Get color based on event type
  const getEventColor = (type) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      case 'holiday': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="calendar-container bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Calendar Header */}
      <div className="calendar-header bg-white shadow-sm">
        <div className="header-left">
          <h1 className="text-indigo-800">Event Calendar</h1>
        </div>
        <button 
          onClick={() => {
            setShowEventModal(true);
            setNewEvent(prev => ({
              ...prev,
              date: format(selectedDate, 'yyyy-MM-dd')
            }));
          }}
          className="add-event-btn bg-indigo-600 hover:bg-indigo-700 shadow-md"
        >
          <FiPlus />
          <span>Add Event</span>
        </button>
      </div>

      {/* Main Calendar Content */}
      <div className="calendar-content">
        {/* Calendar View */}
        <div className="calendar-view bg-white rounded-lg shadow-md m-2">
          {/* Month Navigation */}
          <div className="month-navigation p-4 border-b">
            <button 
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-indigo-600"
            >
              <FiChevronLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button 
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-indigo-600"
            >
              <FiChevronRight size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid-header grid grid-cols-7 gap-1 p-2 bg-gray-50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="day-header text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-grid grid grid-cols-7 gap-1 p-2">
            {renderDays()}
          </div>
        </div>

        {/* Sidebar - Selected Day Details */}
        <div className="day-details bg-white rounded-lg shadow-md m-2 p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h3>

          {/* Holidays Section */}
          {getHolidaysForDate(selectedDate).length > 0 && (
            <div className="holidays-section mb-6">
              <div className="section-header mb-2">
                <h4 className="text-md font-medium text-gray-700">Holidays</h4>
              </div>
              <div className="holidays-list space-y-2">
                {getHolidaysForDate(selectedDate).map(holiday => (
                  <div key={holiday.name} className="holiday-card p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        🎉
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-purple-800">{holiday.name}</h5>
                        <p className="text-xs text-purple-600">{holiday.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Section */}
          <div className="events-section mb-6">
            <div className="section-header mb-2">
              <h4 className="text-md font-medium text-gray-700">Events</h4>
              <button 
                onClick={() => {
                  setShowEventModal(true);
                  setNewEvent(prev => ({
                    ...prev,
                    date: format(selectedDate, 'yyyy-MM-dd')
                  }));
                }}
                className="add-btn text-sm text-indigo-600 hover:text-indigo-800"
              >
                + Add Event
              </button>
            </div>
            {getEventsForDate(selectedDate).length > 0 ? (
              <div className="events-list space-y-3">
                {getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className="event-card p-3 rounded-lg border bg-white shadow-sm">
                    <div className="event-header flex justify-between items-start mb-2">
                      <h5 className="text-sm font-medium text-gray-800">{event.title}</h5>
                      <div className="event-time flex items-center text-xs text-gray-500">
                        <FiClock className="mr-1" size={12} />
                        {formatTimeRange(event.startTime, event.endTime)}
                      </div>
                    </div>
                    <div className="event-details text-xs text-gray-600 space-y-1">
                      <div className={`event-type inline-block px-2 py-0.5 rounded-full ${
                        getEventColor(event.type).replace('bg-', 'bg-opacity-80 ').replace('text-', '')
                      }`}>
                        {event.type}
                      </div>
                      {event.location && (
                        <p className="event-location flex items-center">
                          <FiMapPin className="mr-1" size={12} />
                          {event.location}
                        </p>
                      )}
                      {event.participants && event.participants.length > 0 && (
                        <div className="event-participants">
                          <div className="flex items-center">
                            <FiUsers className="mr-1" size={12} />
                            <span className="text-xs">Participants:</span>
                          </div>
                          <div className="participants-list flex flex-wrap gap-1 mt-1">
                            {event.participants.map((participant, i) => (
                              <span key={i} className="participant-tag px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                                {participant}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message text-sm text-gray-500">No events scheduled</p>
            )}
          </div>

          {/* Tasks Section */}
          <div className="tasks-section">
            <div className="section-header mb-2">
              <h4 className="text-md font-medium text-gray-700">Tasks Due</h4>
            </div>
            {getTasksForDate(selectedDate).length > 0 ? (
              <div className="tasks-list space-y-2">
                {getTasksForDate(selectedDate).map(task => (
                  <div 
                    key={task.id} 
                    className={`task-card p-3 rounded-lg border ${
                      task.completed ? 'bg-green-50 border-green-100' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start">
                      <button 
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`task-checkbox mt-0.5 flex-shrink-0 h-4 w-4 rounded border ${
                          task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        } flex items-center justify-center`}
                      >
                        {task.completed && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <div className="task-content ml-2 flex-1">
                        <div className="task-header flex justify-between">
                          <h5 className={`text-sm ${
                            task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                          }`}>
                            {task.title}
                          </h5>
                          {task.priority === 'high' && !task.completed && (
                            <span className="priority-high text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-800">
                              High
                            </span>
                          )}
                        </div>
                        {!task.completed && (
                          <button 
                            onClick={() => toggleTaskCompletion(task.id)}
                            className="complete-btn mt-1 text-xs text-indigo-600 hover:text-indigo-800"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message text-sm text-gray-500">No tasks due</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-content bg-white rounded-xl overflow-hidden shadow-xl w-full max-w-md">
            <div className="modal-header flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Add New Event</h3>
              <button 
                onClick={() => {
                  setShowEventModal(false);
                  resetNewEvent();
                }}
                className="close-btn text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="modal-form p-4">
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="form-row flex gap-4 mb-4">
                <div className="form-group flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="form-row flex gap-4 mb-4">
                <div className="form-group flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="meeting">Meeting</option>
                  <option value="deadline">Task Deadline</option>
                  <option value="reminder">Reminder</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location (optional)</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Participants (comma separated, optional)</label>
                <input
                  type="text"
                  value={newEvent.participants}
                  onChange={(e) => setNewEvent({...newEvent, participants: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John, Sarah, Mike"
                />
              </div>
              <div className="form-actions flex justify-end gap-3 pt-4 border-t mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEventModal(false);
                    resetNewEvent();
                  }}
                  className="cancel-btn px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;