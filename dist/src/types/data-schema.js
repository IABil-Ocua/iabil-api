"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScholarshipStatus = exports.ArticleStatus = exports.ArticleType = exports.EventType = exports.StudentApprovalStatus = exports.StudentStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["STUDENT"] = "STUDENT";
    UserRole["GRADUETE"] = "GRADUETE";
    UserRole["TEACHER"] = "TEACHER";
})(UserRole || (exports.UserRole = UserRole = {}));
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["ACTIVE"] = "ACTIVE";
    StudentStatus["INACTIVE"] = "INACTIVE";
    StudentStatus["GRADUETED"] = "GRADUETED";
})(StudentStatus || (exports.StudentStatus = StudentStatus = {}));
var StudentApprovalStatus;
(function (StudentApprovalStatus) {
    StudentApprovalStatus["APPROVED"] = "APPROVED";
    StudentApprovalStatus["NOT_APPROVED"] = "NOT_APPROVED";
})(StudentApprovalStatus || (exports.StudentApprovalStatus = StudentApprovalStatus = {}));
var EventType;
(function (EventType) {
    EventType["TRAINING"] = "TRAINING";
    EventType["SEMINAR"] = "SEMINAR";
    EventType["CONFERENCE"] = "CONFERENCE";
})(EventType || (exports.EventType = EventType = {}));
var ArticleType;
(function (ArticleType) {
    ArticleType["INNOVATION"] = "INNOVATION";
    ArticleType["PUBLICATION"] = "PUBLICATION";
})(ArticleType || (exports.ArticleType = ArticleType = {}));
var ArticleStatus;
(function (ArticleStatus) {
    ArticleStatus["DRAFT"] = "DRAFT";
    ArticleStatus["PUBLISHED"] = "PUBLISHED";
    ArticleStatus["ARCHIVED"] = "ARCHIVED";
})(ArticleStatus || (exports.ArticleStatus = ArticleStatus = {}));
var ScholarshipStatus;
(function (ScholarshipStatus) {
    ScholarshipStatus["ACTIVE"] = "ACTIVE";
    ScholarshipStatus["INACTIVE"] = "INACTIVE";
    ScholarshipStatus["CLOSED"] = "CLOSED";
})(ScholarshipStatus || (exports.ScholarshipStatus = ScholarshipStatus = {}));
//# sourceMappingURL=data-schema.js.map