/* =======================
   ENUMS
======================= */

export enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  GRADUETE = "GRADUETE",
  TEACHER = "TEACHER",
}

export enum StudentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  GRADUETED = "GRADUETED",
}

export enum StudentApprovalStatus {
  APPROVED = "APPROVED",
  NOT_APPROVED = "NOT_APPROVED",
}

export enum EventType {
  TRAINING = "TRAINING",
  SEMINAR = "SEMINAR",
  CONFERENCE = "CONFERENCE",
}

export enum ArticleType {
  INNOVATION = "INNOVATION",
  PUBLICATION = "PUBLICATION",
}

export enum ArticleStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum ScholarshipStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CLOSED = "CLOSED",
}

/* =======================
   USER
======================= */

export interface UserProps {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  password: string;
  avatar?: string | null;
  cover?: string | null;
  birthDate?: Date | null;

  createdAt: Date;
  updatedAt: Date;

  events?: EventProps[];
  articles?: ArticleProps[];
}

/* =======================
   STUDENT
======================= */

export interface StudentProps {
  id: string;
  code: string;
  name: string;
  gender?: string | null;
  scholarship?: string | null;
  financier?: string | null;
  qualificationName: string;
  approvalStatus: StudentApprovalStatus;
  specialty?: string | null;
  birthProvince?: string | null;
  birthDate?: Date | null;
  idNumber?: string | null;
  email?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  fatherAffiliation?: string | null;
  motherAffiliation?: string | null;
  guardianName?: string | null;
  guardianAddress?: string | null;
  guardianPhone?: string | null;
  status?: string | null;
  actualProvince?: string | null;
  actualDistrict?: string | null;
  currentOccupation?: string | null;
  companyName?: string | null;
  companyPhone?: string | null;
  position?: string | null;
  startYear?: string | null;

  residencyRegime1?: string | null;
  year1?: string | null;
  level1?: string | null;
  completionYear1?: string | null;
  observation1?: string | null;

  residencyRegime2?: string | null;
  year2?: string | null;
  level2?: string | null;
  completionYear2?: string | null;
  observation2?: string | null;

  residencyRegime3?: string | null;
  year3?: string | null;
  level3?: string | null;
  completionYear3?: string | null;
  observation3?: string | null;

  qualificationId?: string | null;
  qualification?: QualificationProps | null;

  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   CERTIFICATION
======================= */

export interface CertificationProps {
  id: string;
  name: string;
  instituition: string;
  description: string;
  startDate: string;
  endDate: string;

  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   EXPERIENCE
======================= */

export interface ExperienceProps {
  id: string;
  name: string;
  description: string;
  instituition: string;
  startDate: string;
  endDate: string;

  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   QUALIFICATION
======================= */

export interface QualificationProps {
  id: string;
  name: string;
  description?: string | null;
  bannerUrl?: string | null;
  workload: number;
  credits: number;
  knowledgeAreas?: string | null;

  levels?: LevelProps[];
  students?: StudentProps[];

  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   LEVEL
======================= */

export interface LevelProps {
  id: string;
  title: string;
  description: string;
  noticeUrl?: string | null;

  qualificationId: string;
  qualification?: QualificationProps;

  chapters?: ChapterProps[];

  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   CHAPTER
======================= */

export interface ChapterProps {
  id: string;
  content: string;
  supplementaryMaterialUrl1: string;
  supplementaryMaterialUrl2: string;

  levelId: string;
  level?: LevelProps;

  quizzes?: QuizzProps[];

  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   QUIZZ
======================= */

export interface QuizzProps {
  id: string;
  name: string;

  chapterId: string;
  chapter?: ChapterProps;

  quizzItems?: QuizzItemProps[];

  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   QUIZZ ITEM
======================= */

export interface QuizzItemProps {
  id: string;
  question: string;
  option1: string;
  option2: string;
  option3?: string | null;
  option4?: string | null;
  answer: string;

  quizzId: string;
  quizz?: QuizzProps;

  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   PROFESSOR
======================= */

export interface ProfessorProps {
  id: string;
}

/* =======================
   EVENT
======================= */

export interface EventProps {
  id: string;
  title: string;
  description?: string | null;
  startDate: Date;
  endDate?: Date | null;
  location?: string | null;
  type: EventType;
  imageUrl?: string | null;
  organizer?: string | null;
  isPublished: boolean;

  createdById: string;
  createdBy?: UserProps;

  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   ARTICLE
======================= */

export interface ArticleProps {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string | null;
  category: ArticleType;
  tags?: string | null;
  status: ArticleStatus;
  isFeatured: boolean;

  authorId: string;
  author?: UserProps;

  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   JOB VACANCY
======================= */

export interface JobVacancyProps {
  id: string;
  title: string;
  companyName: string;
  location: string;
  url: string;

  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   SCHOLARSHIP
======================= */

export interface ScholarshipProps {
  id: string;
  name: string;
  description?: string | null;
  sponsor?: string | null;
  amount?: number | null;
  type: string;
  startDate?: Date | null;
  endDate?: Date | null;
  status: ScholarshipStatus;

  createdAt: Date;
  updatedAt: Date;
}
