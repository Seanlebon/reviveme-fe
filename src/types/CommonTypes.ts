interface Thread {
  author_id?: number;
  author_name?: string;
  content?: string;
  deleted?: boolean;
  id: number;
  title?: string;
  score: number;
  upvoted: boolean;
  downvoted: boolean;
}

interface Comment {
  author_id?: number;
  author_username?: string;
  content?: string;
  deleted: boolean;
  id: number;
  thread_id: number;
  score?: number;
  upvoted?: boolean;
  downvoted?: boolean;
  children: Comment[];
}

export { Thread, Comment };
