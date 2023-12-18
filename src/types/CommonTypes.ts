interface Thread {
  author_id?: number;
  author_name?: string;
  content?: string;
  deleted?: boolean;
  id?: number;
  title?: string;
}

interface Comment {
  author_id?: number;
  author_username?: string;
  content?: string;
  deleted: boolean;
  id: number;
  thread_id: number;
  children: Comment[];
}

export { Thread, Comment };
