import React, { useState, useRef, useEffect } from 'react';
import { 
  FiX, FiMail, FiStar, FiTrash2, FiArchive, 
  FiCornerUpLeft, FiCornerUpRight, FiSend, 
  FiEdit, FiInbox, FiAlertCircle 
} from 'react-icons/fi';
import './Inbox.css';

const Inbox = () => {
    const [dateTime, setDateTime] = useState('');
    const [showWelcomeBox, setShowWelcomeBox] = useState(true);
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [activeTab, setActiveTab] = useState('inbox');
    const [replyContent, setReplyContent] = useState('');
    const [forwardContent, setForwardContent] = useState('');
    const [forwardRecipient, setForwardRecipient] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [isForwarding, setIsForwarding] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    const [composeData, setComposeData] = useState({
        to: '',
        subject: '',
        content: ''
    });
    const [replies, setReplies] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const [forwardedMessages, setForwardedMessages] = useState([]);
    const messagesContainerRef = useRef(null);

    // Sample Messages Data - IT Company HR Emails
    const sampleMessages = [
        {
            id: 1,
            from: 'HR Department',
            email: 'hr@itcompany.com',
            subject: 'Important: Annual Performance Reviews',
            content: 'Dear Team,\n\nThis is a reminder that annual performance reviews are scheduled for next week. Please complete your self-assessment forms by Friday and book your review slot with your manager.\n\nBest regards,\nHR Team',
            date: '2025-03-18',
            time: '09:00 AM',
            read: false,
            starred: true,
            labels: ['hr', 'important']
        },
        {
            id: 2,
            from: 'Payroll Team',
            email: 'payroll@itcompany.com',
            subject: 'March Salary Disbursement',
            content: 'Hello,\n\nMarch salaries have been processed and will reflect in your accounts by March 31st. Please check your payslips in the employee portal and contact us if you find any discrepancies.\n\nRegards,\nPayroll Team',
            date: '2025-03-17',
            time: '02:30 PM',
            read: true,
            starred: false,
            labels: ['payroll']
        },
        {
            id: 3,
            from: 'Training Coordinator',
            email: 'training@itcompany.com',
            subject: 'Upcoming AWS Certification Training',
            content: 'Hi Developers,\n\nWe are organizing an AWS certification training program starting April 1st. Limited seats available. Please register by March 25th if interested.\n\nTraining Schedule:\n- Weekdays: 6-8 PM\n- Weekends: 10 AM-1 PM\n\nThanks,\nTraining Team',
            date: '2025-03-16',
            time: '11:15 AM',
            read: false,
            starred: true,
            labels: ['training', 'technical']
        },
        {
            id: 4,
            from: 'IT Support',
            email: 'itsupport@itcompany.com',
            subject: 'VPN Maintenance Scheduled',
            content: 'Attention All,\n\nThere will be VPN maintenance this Saturday from 2 AM to 6 AM. During this time, remote access will be unavailable. Please plan your work accordingly.\n\nIT Support Team',
            date: '2025-03-15',
            time: '04:45 PM',
            read: true,
            starred: false,
            labels: ['it', 'maintenance']
        },
        {
            id: 5,
            from: 'HR Head',
            email: 'hrhead@itcompany.com',
            subject: 'New WFH Policy Update',
            content: 'Dear Employees,\n\nStarting April, we are implementing a hybrid work model:\n- 3 days office (Mon-Wed)\n- 2 days WFH (Thu-Fri)\n\nPlease review the attached policy document and acknowledge receipt.\n\nRegards,\nHR Head',
            date: '2025-03-14',
            time: '10:30 AM',
            read: false,
            starred: true,
            labels: ['hr', 'policy', 'important']
        },
        {
            id: 6,
            from: 'Recruitment Team',
            email: 'recruitment@itcompany.com',
            subject: 'Employee Referral Bonus Program',
            content: 'Hello Team,\n\nWe have openings for Senior Developers and DevOps Engineers. Refer qualified candidates and earn ₹50,000 per successful hire! See portal for details.\n\nHappy Hiring!\nRecruitment Team',
            date: '2025-03-13',
            time: '03:20 PM',
            read: true,
            starred: false,
            labels: ['recruitment', 'bonus']
        },
        {
            id: 7,
            from: 'Facilities Manager',
            email: 'facilities@itcompany.com',
            subject: 'Office AC Maintenance',
            content: 'Notice:\n\nAC maintenance will be conducted floor-wise from March 20-22. Your floor schedule:\n- 3rd Floor: March 20 (10 AM-2 PM)\nPlease bear with temporary temperature variations.\n\nFacilities Team',
            date: '2025-03-12',
            time: '01:00 PM',
            read: true,
            starred: false,
            labels: ['facilities']
        },
        {
            id: 8,
            from: 'Compliance Officer',
            email: 'compliance@itcompany.com',
            subject: 'Mandatory Cybersecurity Training',
            content: 'Urgent:\n\nAll employees must complete the new cybersecurity training module by March 25th. This is mandatory per company policy. Non-compliance may affect app access.\n\nCompliance Team',
            date: '2025-03-11',
            time: '11:45 AM',
            read: false,
            starred: true,
            labels: ['compliance', 'training', 'important']
        },
        {
            id: 9,
            from: 'Team Lead - Project X',
            email: 'projectx@itcompany.com',
            subject: 'Client Demo Preparation',
            content: 'Hi Team,\n\nClient demo scheduled for March 22 at 11 AM. Please ensure:\n1. All test cases pass\n2. Documentation updated\n3. Demo script rehearsed\n\nLet\'s meet tomorrow at 4 PM to review progress.\n\nThanks,\nTeam Lead',
            date: '2025-03-10',
            time: '05:30 PM',
            read: true,
            starred: false,
            labels: ['project', 'client']
        },
        {
            id: 10,
            from: 'CEO Office',
            email: 'ceo@itcompany.com',
            subject: 'Quarterly Townhall Meeting',
            content: 'Dear Team,\n\nJoin us for our Q1 Townhall on March 28th at 3 PM in the auditorium. Agenda includes:\n- Company performance\n- New initiatives\n- Q&A session\n\nAttendance is mandatory for all employees.\n\nBest,\nCEO Office',
            date: '2025-03-09',
            time: '09:15 AM',
            read: false,
            starred: true,
            labels: ['ceo', 'important', 'meeting']
        }
    ];

    // Sample replies data
    const sampleReplies = [
        {
            id: 1,
            messageId: 1,
            from: 'You',
            email: 'employee@itcompany.com',
            content: 'Thanks for the reminder. I have completed my self-assessment and booked a slot with my manager for March 20th at 11 AM.',
            date: '2025-03-18',
            time: '10:30 AM'
        },
        {
            id: 2,
            messageId: 5,
            from: 'You',
            email: 'employee@itcompany.com',
            content: 'I have reviewed the new WFH policy and submitted my acknowledgment. Looking forward to the hybrid work model!',
            date: '2025-03-14',
            time: '02:45 PM'
        }
    ];

    // Sample sent messages
    const sampleSentMessages = [
        {
            id: 101,
            to: 'hr@itcompany.com',
            subject: 'Leave Application - March 25-27',
            content: 'Dear HR,\n\nI would like to apply for leave from March 25th to 27th for personal reasons. Please approve my application.\n\nRegards,\n[Your Name]',
            date: '2025-03-17',
            time: '11:20 AM',
            starred: false,
            labels: ['hr', 'leave']
        },
        {
            id: 102,
            to: 'training@itcompany.com',
            subject: 'Registration for AWS Training',
            content: 'Hi Training Team,\n\nI would like to register for the AWS certification training program starting April 1st. Please confirm my enrollment.\n\nThanks,\n[Your Name]',
            date: '2025-03-16',
            time: '03:45 PM',
            starred: true,
            labels: ['training', 'technical']
        }
    ];

    // Sample forwarded messages
    const sampleForwardedMessages = [
        {
            id: 201,
            to: 'teamlead@itcompany.com',
            originalFrom: 'client@business.com',
            subject: 'FW: Urgent Bug Fix Request',
            content: 'Hi Team Lead,\n\nForwarding this client request regarding a critical bug in the production environment. They need this fixed ASAP.\n\n---------- Forwarded Message ----------\nFrom: Client <client@business.com>\nSubject: Production Issue\n\nWe are experiencing a critical bug where...',
            date: '2025-03-15',
            time: '10:15 AM',
            starred: false,
            labels: ['client', 'urgent']
        }
    ];

    useEffect(() => {
        setMessages(sampleMessages);
        setReplies(sampleReplies);
        setSentMessages(sampleSentMessages);
        setForwardedMessages(sampleForwardedMessages);

        // Live Date and Time with Day
        const interval = setInterval(() => {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            setDateTime(now.toLocaleDateString('en-US', options));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Scroll to top when tab changes
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = 0;
        }
    }, [activeTab]);

    const toggleStar = (messageId) => {
        setMessages(messages.map(msg => 
            msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
        ));
        setSentMessages(sentMessages.map(msg => 
            msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
        ));
        setForwardedMessages(forwardedMessages.map(msg => 
            msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
        ));
        if (selectedMessage && selectedMessage.id === messageId) {
            setSelectedMessage({
                ...selectedMessage,
                starred: !selectedMessage.starred
            });
        }
    };

    const markAsRead = (messageId) => {
        setMessages(messages.map(msg => 
            msg.id === messageId ? { ...msg, read: true } : msg
        ));
    };

    const deleteMessage = (messageId) => {
        setMessages(messages.filter(msg => msg.id !== messageId));
        setSentMessages(sentMessages.filter(msg => msg.id !== messageId));
        setForwardedMessages(forwardedMessages.filter(msg => msg.id !== messageId));
        if (selectedMessage && selectedMessage.id === messageId) {
            setSelectedMessage(null);
        }
    };

    const handleReply = () => {
        setIsReplying(true);
        setIsForwarding(false);
        setIsComposing(false);
        setReplyContent(`\n\n---------- Original Message ----------\nFrom: ${selectedMessage.from} <${selectedMessage.email}>\nDate: ${selectedMessage.date} at ${selectedMessage.time}\nSubject: ${selectedMessage.subject}\n\n${selectedMessage.content}`);
    };

    const handleForward = () => {
        setIsForwarding(true);
        setIsReplying(false);
        setIsComposing(false);
        setForwardContent(`\n\n---------- Forwarded Message ----------\nFrom: ${selectedMessage.from} <${selectedMessage.email}>\nDate: ${selectedMessage.date} at ${selectedMessage.time}\nSubject: ${selectedMessage.subject}\n\n${selectedMessage.content}`);
    };

    const sendReply = () => {
        const newReply = {
            id: replies.length + 1,
            messageId: selectedMessage.id,
            from: 'You',
            email: 'me@example.com',
            content: replyContent,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        const newSentMessage = {
            id: Date.now(),
            to: selectedMessage.email,
            subject: `Re: ${selectedMessage.subject}`,
            content: replyContent,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            starred: false,
            labels: ['sent']
        };
        
        setReplies([...replies, newReply]);
        setSentMessages([newSentMessage, ...sentMessages]);
        alert('Reply sent successfully!');
        setIsReplying(false);
        setReplyContent('');
    };

    const sendForward = () => {
        if (!forwardRecipient) {
            alert('Please enter a recipient email');
            return;
        }
        
        const newForwardedMessage = {
            id: Date.now(),
            to: forwardRecipient,
            originalFrom: selectedMessage.from,
            subject: `FW: ${selectedMessage.subject}`,
            content: forwardContent,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            starred: false,
            labels: ['forwarded']
        };
        
        setForwardedMessages([newForwardedMessage, ...forwardedMessages]);
        alert(`Message forwarded to ${forwardRecipient}`);
        setIsForwarding(false);
        setForwardContent('');
        setForwardRecipient('');
    };

    const handleCompose = () => {
        setIsComposing(true);
        setIsReplying(false);
        setIsForwarding(false);
        setSelectedMessage(null);
    };

    const handleComposeChange = (e) => {
        const { name, value } = e.target;
        setComposeData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const sendComposedMail = () => {
        if (!composeData.to || !composeData.subject) {
            alert('Please fill in all required fields');
            return;
        }
        
        const newMessage = {
            id: Date.now(),
            to: composeData.to,
            subject: composeData.subject,
            content: composeData.content,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            starred: false,
            labels: ['sent']
        };
        
        setSentMessages([newMessage, ...sentMessages]);
        alert('Message sent successfully!');
        setIsComposing(false);
        setComposeData({ to: '', subject: '', content: '' });
    };

    const filteredMessages = 
        activeTab === 'starred' 
            ? [...messages, ...sentMessages, ...forwardedMessages].filter(msg => msg.starred)
            : activeTab === 'unread'
            ? messages.filter(msg => !msg.read)
            : activeTab === 'sent'
            ? sentMessages
            : activeTab === 'forwarded'
            ? forwardedMessages
            : messages;

    const messageReplies = selectedMessage 
        ? replies.filter(reply => reply.messageId === selectedMessage.id)
        : [];

    const getTabTitle = () => {
        switch (activeTab) {
            case 'starred': return 'Starred Messages';
            case 'unread': return 'Unread Messages';
            case 'sent': return 'Sent Messages';
            case 'forwarded': return 'Forwarded Messages';
            default: return 'Inbox';
        }
    };

    return (
        <div className="inbox-container">
            {/* Gradient Background Layer */}
            <div className="gradient-bg">
                <div className="gradient-circle pink"></div>
                <div className="gradient-circle blue"></div>
                <div className="gradient-circle purple"></div>
            </div>

            {/* Main Content Area */}
            <div className="inbox-content">
                {/* Welcome Box with animation */}
                {showWelcomeBox && (
                    <div className="welcome-box animate-pop">
                        <button
                            className="close-welcome"
                            onClick={() => setShowWelcomeBox(false)}
                        >
                            <FiX size={20} />
                        </button>
                        <div className="welcome-content">
                            <div className="welcome-icon-container">
                                <FiMail className="welcome-icon" size={24} />
                            </div>
                            <div>
                                <p className="welcome-title">Welcome to your inbox!</p>
                                <p className="welcome-message">
                                    You have {messages.filter(m => !m.read).length} unread messages. Stay organized with our email management tools.
                                </p>
                            </div>
                        </div>
                        <div className="welcome-decoration"></div>
                    </div>
                )}

                {/* Header with floating effect */}
                <div className="inbox-header floating">
                    <div>
                        <h1 className="inbox-title">
                            {getTabTitle()}, <span className="username">User</span>!
                        </h1>
                        <p className="inbox-date">{dateTime}</p>
                    </div>
                    <button
                        onClick={handleCompose}
                        className="compose-button glow-on-hover"
                    >
                        <FiEdit className="mr-2" /> Compose
                    </button>
                </div>

                {/* Tabs with subtle animation */}
                <div className="inbox-tabs slide-in">
                    <button
                        className={`inbox-tab ${activeTab === 'inbox' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inbox')}
                    >
                        <FiInbox className="mr-2" /> Inbox ({messages.length})
                    </button>
                    <button
                        className={`inbox-tab ${activeTab === 'starred' ? 'active' : ''}`}
                        onClick={() => setActiveTab('starred')}
                    >
                        <FiStar className="mr-2" /> Starred ({[...messages, ...sentMessages, ...forwardedMessages].filter(msg => msg.starred).length})
                    </button>
                    <button
                        className={`inbox-tab ${activeTab === 'unread' ? 'active' : ''}`}
                        onClick={() => setActiveTab('unread')}
                    >
                        <FiAlertCircle className="mr-2" /> Unread ({messages.filter(msg => !msg.read).length})
                    </button>
                    <button
                        className={`inbox-tab ${activeTab === 'sent' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sent')}
                    >
                        <FiSend className="mr-2" /> Sent ({sentMessages.length})
                    </button>
                    <button
                        className={`inbox-tab ${activeTab === 'forwarded' ? 'active' : ''}`}
                        onClick={() => setActiveTab('forwarded')}
                    >
                        <FiCornerUpRight className="mr-2" /> Forwarded ({forwardedMessages.length})
                    </button>
                </div>

                {/* Main content with glassmorphism effect */}
                <div className="inbox-main glass-card">
                    <div className="inbox-layout">
                        {/* Message List Column */}
                        <div className={`message-list ${selectedMessage || isComposing ? 'hidden-on-mobile' : ''}`}>
                            <div className="message-list-header">
                                <h2>
                                    {getTabTitle()} ({filteredMessages.length})
                                </h2>
                            </div>
                            <div 
                                ref={messagesContainerRef}
                                className="message-list-content"
                            >
                                {filteredMessages.length > 0 ? (
                                    filteredMessages.map(message => (
                                        <div 
                                            key={message.id}
                                            className={`message-item ${!message.read && activeTab !== 'sent' && activeTab !== 'forwarded' ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'selected' : ''} hover-float`}
                                            onClick={() => {
                                                setSelectedMessage(message);
                                                if (activeTab !== 'sent' && activeTab !== 'forwarded') {
                                                    markAsRead(message.id);
                                                }
                                            }}
                                        >
                                            <div className="message-item-header">
                                                <div className="message-item-sender">
                                                    {!message.read && activeTab !== 'sent' && activeTab !== 'forwarded' && (
                                                        <span className="unread-indicator"></span>
                                                    )}
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleStar(message.id);
                                                        }}
                                                        className="star-button"
                                                    >
                                                        <FiStar className={message.starred ? 'starred' : ''} />
                                                    </button>
                                                    <div className="message-sender-info">
                                                        <div className="message-sender-name">
                                                            {activeTab === 'sent' ? `To: ${message.to}` : 
                                                             activeTab === 'forwarded' ? `To: ${message.to}` : 
                                                             message.from}
                                                        </div>
                                                        <p className="message-sender-email">
                                                            {activeTab === 'sent' ? message.date : 
                                                             activeTab === 'forwarded' ? `From: ${message.originalFrom}` : 
                                                             message.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="message-time">{message.time}</span>
                                            </div>
                                            <h3 className={`message-subject ${(!message.read && activeTab !== 'sent' && activeTab !== 'forwarded') ? 'unread' : ''}`}>
                                                {message.subject}
                                            </h3>
                                            <p className="message-preview">
                                                {message.content.substring(0, 80)}...
                                            </p>
                                            <div className="message-actions">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteMessage(message.id);
                                                    }}
                                                    className="delete-button"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-messages">
                                        <div className="empty-icon-container">
                                            <FiMail size={48} className="empty-icon" />
                                        </div>
                                        <p>No messages found in this folder</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Message Detail Column or Compose New Message */}
                        {isComposing ? (
                            <div className="message-detail glass-card">
                                <div className="message-detail-header">
                                    <h2>New Message</h2>
                                    <button 
                                        className="close-button"
                                        onClick={() => setIsComposing(false)}
                                    >
                                        <FiX size={20} />
                                    </button>
                                </div>
                                <div className="compose-form">
                                    <div className="form-group">
                                        <label>To:</label>
                                        <input 
                                            type="email" 
                                            name="to"
                                            placeholder="recipient@example.com"
                                            value={composeData.to}
                                            onChange={handleComposeChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Subject:</label>
                                        <input 
                                            type="text" 
                                            name="subject"
                                            placeholder="Subject"
                                            value={composeData.subject}
                                            onChange={handleComposeChange}
                                        />
                                    </div>
                                    <textarea
                                        name="content"
                                        value={composeData.content}
                                        onChange={handleComposeChange}
                                        placeholder="Write your message here..."
                                    />
                                    <div className="form-actions">
                                        <button 
                                            className="cancel-button"
                                            onClick={() => setIsComposing(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            className="send-button"
                                            onClick={sendComposedMail}
                                        >
                                            <FiSend className="mr-2" /> Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : selectedMessage ? (
                            <div className="message-detail glass-card">
                                <div className="message-detail-header">
                                    <button 
                                        className="back-button"
                                        onClick={() => setSelectedMessage(null)}
                                    >
                                        <FiCornerUpLeft className="mr-1" /> Back
                                    </button>
                                    <div className="message-actions">
                                        {activeTab !== 'sent' && activeTab !== 'forwarded' && (
                                            <>
                                                <button 
                                                    className={`action-button ${isReplying ? 'active' : ''}`}
                                                    onClick={handleReply}
                                                    title="Reply"
                                                >
                                                    <FiCornerUpLeft size={18} />
                                                </button>
                                                <button 
                                                    className={`action-button ${isForwarding ? 'active' : ''}`}
                                                    onClick={handleForward}
                                                    title="Forward"
                                                >
                                                    <FiCornerUpRight size={18} />
                                                </button>
                                            </>
                                        )}
                                        <button className="action-button" title="Archive">
                                            <FiArchive size={18} />
                                        </button>
                                        <button 
                                            className="delete-button"
                                            onClick={() => deleteMessage(selectedMessage.id)}
                                            title="Delete"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div className="message-content-header">
                                        <h2>{selectedMessage.subject}</h2>
                                        <button 
                                            onClick={() => toggleStar(selectedMessage.id)}
                                            className="star-button"
                                        >
                                            <FiStar className={selectedMessage.starred ? 'starred' : ''} size={20} />
                                        </button>
                                    </div>
                                    <div className="message-meta">
                                        {activeTab === 'sent' ? (
                                            <p className="message-recipient">To: {selectedMessage.to}</p>
                                        ) : activeTab === 'forwarded' ? (
                                            <>
                                                <p className="message-recipient">To: {selectedMessage.to}</p>
                                                <p className="message-original-from">Original From: {selectedMessage.originalFrom}</p>
                                            </>
                                        ) : (
                                            <p className="message-sender">From: {selectedMessage.from} &lt;{selectedMessage.email}&gt;</p>
                                        )}
                                        <p className="message-date">Date: {selectedMessage.date} at {selectedMessage.time}</p>
                                    </div>
                                    <div className="message-body">
                                        <p>{selectedMessage.content}</p>
                                    </div>

                                    {/* Replies Section */}
                                    {messageReplies.length > 0 && (
                                        <div className="replies-section">
                                            <h3>Replies ({messageReplies.length})</h3>
                                            {messageReplies.map((reply, index) => (
                                                <div key={index} className="reply-item">
                                                    <div className="reply-header">
                                                        <div>
                                                            <span className="reply-from">{reply.from}</span>
                                                            <span className="reply-email">&lt;{reply.email}&gt;</span>
                                                        </div>
                                                        <span className="reply-date">{reply.date} at {reply.time}</span>
                                                    </div>
                                                    <div className="reply-body">
                                                        <p>{reply.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Reply Section */}
                                    {isReplying && (
                                        <div className="reply-form">
                                            <h3>Reply to {selectedMessage.from}</h3>
                                            <textarea
                                                rows="6"
                                                value={replyContent}
                                                onChange={(e) => setReplyContent(e.target.value)}
                                                placeholder="Type your reply here..."
                                            />
                                            <div className="form-actions">
                                                <button 
                                                    className="cancel-button"
                                                    onClick={() => setIsReplying(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    className="send-button"
                                                    onClick={sendReply}
                                                >
                                                    <FiSend className="mr-2" /> Send Reply
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Forward Section */}
                                    {isForwarding && (
                                        <div className="forward-form">
                                            <h3>Forward Message</h3>
                                            <div className="form-group">
                                                <label>To:</label>
                                                <input 
                                                    type="email" 
                                                    placeholder="recipient@example.com"
                                                    value={forwardRecipient}
                                                    onChange={(e) => setForwardRecipient(e.target.value)}
                                                />
                                            </div>
                                            <textarea
                                                rows="6"
                                                value={forwardContent}
                                                onChange={(e) => setForwardContent(e.target.value)}
                                                placeholder="Add any additional message..."
                                            />
                                            <div className="form-actions">
                                                <button 
                                                    className="cancel-button"
                                                    onClick={() => setIsForwarding(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    className="send-button"
                                                    onClick={sendForward}
                                                >
                                                    <FiSend className="mr-2" /> Send Forward
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="empty-detail">
                                <div className="empty-icon-container">
                                    <FiMail size={48} className="empty-icon pulse" />
                                </div>
                                <h3>Select a message to read</h3>
                                <p>No message selected</p>
                                <button
                                    className="compose-button glow-on-hover"
                                    onClick={handleCompose}
                                >
                                    <FiEdit className="mr-2" /> Compose New
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inbox;