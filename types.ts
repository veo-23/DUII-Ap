
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export enum CourseCategory {
  GENERAL = 'GENERAL',
  ARABIC = 'ARABIC'
}

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  passcode: string; 
  department?: string;
  batch?: string;
  avatar?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  instructorIds: string[];
  category: CourseCategory;
}

export interface Section {
  id: string;
  courseId: string;
  schedule: string;
  room: string;
  capacity: number;
  instructorId: string;
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE'
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  sectionId: string;
  date: string;
  status: AttendanceStatus;
  method: 'QR' | 'MANUAL';
}

export interface Assignment {
  id: string;
  courseId: string;
  sectionId: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  fileUrl: string;
  grade?: number;
  feedback?: string;
}

export interface Announcement {
  id: string;
  senderId: string;
  title: string;
  content: string;
  targetRole: UserRole | 'ALL';
  sectionId?: string;
  timestamp: string;
}

export interface PaymentConfig {
  gateway: 'BKASH' | 'NAGAD' | 'ROCKET';
  merchantNumber: string;
  apiKey: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'PERCENT' | 'FIXED';
  value: number;
  targetStudentId?: string;
  targetSectionId?: string;
  expiryDate: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  gateway: string;
  timestamp: string;
  couponUsed?: string;
}
