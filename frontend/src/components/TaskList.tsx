import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasks().then((result) => {
      if (result.success) {
        setTasks(result.data);
      } else {
        alert("Failed to fetch tasks:" + result.error);
      }
    });
  }, []);

  return (
    <div className={styles.tasks}>
      <span className={styles.title}>{title}</span>
      <div className={styles.tasksContainer}>
        {tasks.length === 0 ? (
          <p className={styles.noTasksMessage}>No tasks yet. Add one above to get started.</p>
        ) : (
          tasks.map((task) => <TaskItem task={task} key={task._id} />)
        )}
      </div>
    </div>
  );
}
