import React, { useState } from 'react';
import { FiAlertCircle, FiClock, FiCheckCircle, FiUser } from 'react-icons/fi';
import '../Task/Task.css'; // Assuming you have a CSS file for styling

const TaskManagement = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Employee Onboarding Approval', status: 'new' },
        { id: 2, title: 'Payroll Processing', status: 'in-progress' },
        { id: 3, title: 'Employee Satisfaction Survey', status: 'completed' }
    ]);

    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const updateTaskStatus = (taskId, newStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
    };

    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            const newTask = {
                id: tasks.length + 1,
                title: newTaskTitle,
                status: 'new'
            };
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setShowAddTaskForm(false);
        }
    };

    // Calculate the count of tasks for each status
    const newTaskCount = tasks.filter(task => task.status === 'new').length;
    const inProgressTaskCount = tasks.filter(task => task.status === 'in-progress').length;
    const completedTaskCount = tasks.filter(task => task.status === 'completed').length;

    return (
        <div className="bg-white shadow-md rounded-lg p-4 task-container">
            <div className="header flex justify-between items-center">
                <h1 className="text-lg font-semibold">Task Management</h1>
                <div className="flex items-center">
                    <FiUser className="mr-2" />
                    <span>Sneha Sharma</span>
                </div>
            </div>

            <div className="new-request mb-4">
                <h2 className="text-md font-semibold">New Request</h2>
                <button className="add-task" onClick={() => setShowAddTaskForm(!showAddTaskForm)}>
                    Add task
                </button>
                {showAddTaskForm && (
                    <div className="mt-4">
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="p-2 border rounded"
                            placeholder="Enter task title"
                        />
                        <button
                            onClick={handleAddTask}
                            className="add-task"
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-grey-50 shadow-sm rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* New Requests */}
                    <div className="space-y-4">
                        <h4 className="text-md font-semibold text-blue-600 flex items-center">
                            <FiAlertCircle className="mr-2" /> New Requests ({newTaskCount})
                        </h4>
                        {tasks
                            .filter((task) => task.status === 'new')
                            .map((task) => (
                                <div key={task.id} className="bg-white p-3 rounded-lg shadow-xs task-card">
                                    <p className="text-gray-700">{task.title}</p>
                                    <button
                                        onClick={() => updateTaskStatus(task.id, 'in-progress')}
                                        className="mt-2 text-sm text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
                                    >
                                        Move to In Progress
                                    </button>
                                </div>
                            ))}
                    </div>

                    {/* In Progress */}
                    <div className="space-y-4">
                        <h4 className="text-md font-semibold text-yellow-600 flex items-center">
                            <FiClock className="mr-2" /> In Progress ({inProgressTaskCount})
                        </h4>
                        {tasks
                            .filter((task) => task.status === 'in-progress')
                            .map((task) => (
                                <div key={task.id} className="bg-white p-3 rounded-lg shadow-xs task-card">
                                    <p className="text-gray-700">{task.title}</p>
                                    <button
                                        onClick={() => updateTaskStatus(task.id, 'completed')}
                                        className="mt-2 text-sm text-white bg-green-500 hover:bg-green-700 px-3 py-1 rounded"
                                    >
                                        Mark as Completed
                                    </button>
                                </div>
                            ))}
                    </div>

                    {/* Completed */}
                    <div className="space-y-4">
                        <h4 className="text-md font-semibold text-green-600 flex items-center">
                            <FiCheckCircle className="mr-2" /> Completed ({completedTaskCount})
                        </h4>
                        {tasks
                            .filter((task) => task.status === 'completed')
                            .map((task) => (
                                <div key={task.id} className="bg-white p-3 rounded-lg shadow-xs task-card">
                                    <p className="text-gray-700">{task.title}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;