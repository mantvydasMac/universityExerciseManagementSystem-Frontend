import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate }   from 'react-router-dom';
import { taskAPI }       from '../../api/taskAPI';
import { profilesAPI }   from '../../api/profilesAPI';
import startOfWeek from 'date-fns/startOfWeek';
import startOfDay  from 'date-fns/startOfDay';
import addDays     from 'date-fns/addDays';
import format      from 'date-fns/format';
import isSameDay   from 'date-fns/isSameDay';
import parseISO    from 'date-fns/parseISO';
import './TimelineView.css';

export default function TimelineView({ groups, currentUserId }) {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(
        () => startOfWeek(new Date(), { weekStartsOn: 1 })
    );
    const [tasks, setTasks]     = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!groups.length) return;
        (async () => {
            setLoading(true);
            try {
                const profiles   = await profilesAPI.fetchProfilesByUser(currentUserId);
                const profileIds = new Set(profiles.map(p => p.id));
                const results    = await Promise.all(
                    groups.map(g => taskAPI.fetchTasksOfGroup(g.id))
                );
                const allTasks   = results.flat();
                const mine       = allTasks.filter(t => profileIds.has(t.assignedToId));
                setTasks(mine);
            } catch (err) {
                console.error('Timeline fetch error:', err);
            } finally {
                setLoading(false);
            }
        })();
    }, [groups, currentUserId]);

    const weekDates = useMemo(
        () => Array.from({ length: 7 }, (_, i) => addDays(startDate, i)),
        [startDate]
    );
    const today     = startOfDay(new Date());

    const prevWeek = () => setStartDate(d => addDays(d, -7));
    const nextWeek = () => setStartDate(d => addDays(d, 7));

    if (loading) {
        return <div className="timeline-view">Loading timeline…</div>;
    }

    return (
        <div className="timeline-view">
            <div className="timeline-view__nav">
                <button onClick={prevWeek} className="timeline-view__nav-btn">← Prev</button>
                <button onClick={nextWeek} className="timeline-view__nav-btn">Next →</button>
            </div>

            <div className="timeline-view__header">
                {weekDates.map(date => (
                    <div key={date.toISOString()} className="timeline-view__day-header">
                        {format(date, 'EEE dd/MM')}
                    </div>
                ))}
            </div>

            <div className="timeline-view__body">
                {weekDates.map(date => {
                    const isLateColumn  = date < today;
                    const isTodayColumn = isSameDay(date, today);
                    return (
                        <div key={date.toISOString()} className="timeline-view__day-column">
                            {tasks
                                .filter(task => {
                                    if (!task.deadline) return false;
                                    if (task.status === 'COMPLETED') return false;
                                    const dl = parseISO(task.deadline);
                                    return isSameDay(dl, date);
                                })
                                .map(task => (
                                    <div
                                        key={task.id}
                                        className={
                                            `timeline-view__task` +
                                            (isLateColumn  ? ' timeline-view__task--late'  : '') +
                                            (isTodayColumn ? ' timeline-view__task--today' : '')
                                        }
                                        onClick={() => navigate(`/groups/${task.groupId}/tasks`)}
                                    >
                                        {task.title}
                                    </div>
                                ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}