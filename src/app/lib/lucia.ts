import { Session, User } from "lucia"

export interface SessionData {
    user: User | null
    session: Session | null
  }