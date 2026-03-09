"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.ScholarshipScalarFieldEnum = exports.JobVacancyScalarFieldEnum = exports.ArticleScalarFieldEnum = exports.EventScalarFieldEnum = exports.ModuleProgressScalarFieldEnum = exports.ChapterProgressScalarFieldEnum = exports.QuizzItemScalarFieldEnum = exports.QuizzScalarFieldEnum = exports.ChapterScalarFieldEnum = exports.ModuleScalarFieldEnum = exports.LevelScalarFieldEnum = exports.QualificationScalarFieldEnum = exports.ExperienceScalarFieldEnum = exports.CertificationScalarFieldEnum = exports.TeacherScalarFieldEnum = exports.StudentScalarFieldEnum = exports.RelationLoadStrategy = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.4.2",
    engine: "94a226be1cf2967af2541cca5529f0f7ba866919"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Student: 'Student',
    Teacher: 'Teacher',
    Certification: 'Certification',
    Experience: 'Experience',
    Qualification: 'Qualification',
    Level: 'Level',
    Module: 'Module',
    Chapter: 'Chapter',
    Quizz: 'Quizz',
    QuizzItem: 'QuizzItem',
    ChapterProgress: 'ChapterProgress',
    ModuleProgress: 'ModuleProgress',
    Event: 'Event',
    Article: 'Article',
    JobVacancy: 'JobVacancy',
    Scholarship: 'Scholarship'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    username: 'username',
    email: 'email',
    role: 'role',
    password: 'password',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RelationLoadStrategy = {
    query: 'query',
    join: 'join'
};
exports.StudentScalarFieldEnum = {
    id: 'id',
    code: 'code',
    name: 'name',
    gender: 'gender',
    scholarship: 'scholarship',
    financier: 'financier',
    specialty: 'specialty',
    birthProvince: 'birthProvince',
    birthDate: 'birthDate',
    idNumber: 'idNumber',
    email: 'email',
    phone1: 'phone1',
    phone2: 'phone2',
    fatherAffiliation: 'fatherAffiliation',
    motherAffiliation: 'motherAffiliation',
    guardianName: 'guardianName',
    guardianAddress: 'guardianAddress',
    guardianPhone: 'guardianPhone',
    status: 'status',
    actualProvince: 'actualProvince',
    actualDistrict: 'actualDistrict',
    currentOccupation: 'currentOccupation',
    companyName: 'companyName',
    companyPhone: 'companyPhone',
    position: 'position',
    startYear: 'startYear',
    residencyRegime1: 'residencyRegime1',
    year1: 'year1',
    level1: 'level1',
    completionYear1: 'completionYear1',
    observation1: 'observation1',
    residencyRegime2: 'residencyRegime2',
    year2: 'year2',
    level2: 'level2',
    completionYear2: 'completionYear2',
    observation2: 'observation2',
    residencyRegime3: 'residencyRegime3',
    year3: 'year3',
    level3: 'level3',
    completionYear3: 'completionYear3',
    observation3: 'observation3',
    approvalStatus: 'approvalStatus',
    userId: 'userId',
    qualificationId: 'qualificationId',
    currentLevelId: 'currentLevelId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TeacherScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    phoneNumber: 'phoneNumber',
    academicTitle: 'academicTitle',
    specialty: 'specialty',
    department: 'department',
    birthDate: 'birthDate',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CertificationScalarFieldEnum = {
    id: 'id',
    name: 'name',
    instituition: 'instituition',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ExperienceScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    instituition: 'instituition',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.QualificationScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    bannerUrl: 'bannerUrl',
    workload: 'workload',
    knowledgeAreas: 'knowledgeAreas',
    credits: 'credits',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.LevelScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    noticeUrl: 'noticeUrl',
    qualificationId: 'qualificationId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ModuleScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    workload: 'workload',
    levelId: 'levelId',
    documentUrl: 'documentUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ChapterScalarFieldEnum = {
    id: 'id',
    title: 'title',
    content: 'content',
    supplementaryMaterialUrl1: 'supplementaryMaterialUrl1',
    supplementaryMaterialUrl2: 'supplementaryMaterialUrl2',
    moduleId: 'moduleId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.QuizzScalarFieldEnum = {
    id: 'id',
    name: 'name',
    chapterId: 'chapterId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.QuizzItemScalarFieldEnum = {
    id: 'id',
    question: 'question',
    option1: 'option1',
    option2: 'option2',
    option3: 'option3',
    option4: 'option4',
    answer: 'answer',
    quizzId: 'quizzId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ChapterProgressScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    chapterId: 'chapterId',
    completed: 'completed',
    completedAt: 'completedAt'
};
exports.ModuleProgressScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    moduleId: 'moduleId',
    completed: 'completed',
    completedAt: 'completedAt'
};
exports.EventScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    location: 'location',
    type: 'type',
    organizer: 'organizer',
    createdAt: 'createdAt',
    createdById: 'createdById',
    endDate: 'endDate',
    imageUrl: 'imageUrl',
    isPublished: 'isPublished',
    startDate: 'startDate',
    updatedAt: 'updatedAt'
};
exports.ArticleScalarFieldEnum = {
    id: 'id',
    title: 'title',
    slug: 'slug',
    content: 'content',
    category: 'category',
    tags: 'tags',
    status: 'status',
    authorId: 'authorId',
    createdAt: 'createdAt',
    imageUrl: 'imageUrl',
    isFeatured: 'isFeatured',
    publishedAt: 'publishedAt',
    updatedAt: 'updatedAt'
};
exports.JobVacancyScalarFieldEnum = {
    id: 'id',
    title: 'title',
    companyName: 'companyName',
    location: 'location',
    url: 'url',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ScholarshipScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    sponsor: 'sponsor',
    amount: 'amount',
    type: 'type',
    status: 'status',
    createdAt: 'createdAt',
    endDate: 'endDate',
    startDate: 'startDate',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map