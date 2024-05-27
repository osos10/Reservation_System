enum Role {
  Admin = "Admin",
  User = "User",
  Jury = "Jury"
}
enum Status {
  Confirmed = "Confirmed",
  Cancelled = "Cancelled"

}
export interface User {
  id:            number;
  name:              string;
  email:          string;
  role :          Role;
}

export interface JuryMember {
  id:            number;
  user:          User;
}

export interface Session {

  id: number;
  date: string; // e.g., "2023-05-26"
  startTime: string; // e.g., "14:00:00"
  endTime: string; // e.g., "15:00:00"
  maxReservations: number;


}

export interface Reservation {

  id: number;
  ReservationStatus: Status;
  user:           User;
  session:      Session;
}

