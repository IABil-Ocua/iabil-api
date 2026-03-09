"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistrationTemplate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const UserRegistrationTemplate = ({ name, email, role, password, platformName, loginUrl, }) => {
    const roleName = () => {
        switch (role) {
            case "ADMIN":
                return "Administrador";
            case "TEACHER":
                return "Professor";
            case "STUDENT":
                return "Aluno";
            case "SUPER_ADMIN":
                return "Super Administrador";
            default:
                return "";
        }
    };
    return ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsx)(components_1.Head, {}), (0, jsx_runtime_1.jsxs)(components_1.Preview, { children: ["Bem-vindo(a) \u00E0 ", platformName, " \u2014 o seu cadastro foi conclu\u00EDdo"] }), (0, jsx_runtime_1.jsx)(components_1.Body, { style: main, children: (0, jsx_runtime_1.jsxs)(components_1.Container, { style: container, children: [(0, jsx_runtime_1.jsx)(components_1.Heading, { style: heading, children: "Cadastro na plataforma do IABil!" }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: text, children: ["Ol\u00E1, ", (0, jsx_runtime_1.jsx)("strong", { children: name }), "!"] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: text, children: ["O seu cadastro na plataforma ", platformName, "como", " ", (0, jsx_runtime_1.jsx)("strong", { children: roleName() }), " foi realizado com sucesso."] }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: text, children: "Aqui est\u00E3o as suas credenciais de acesso:" }), (0, jsx_runtime_1.jsxs)(components_1.Section, { style: credentialsBox, children: [(0, jsx_runtime_1.jsxs)(components_1.Text, { style: credential, children: [(0, jsx_runtime_1.jsx)("strong", { children: "Email:" }), " ", email] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: credential, children: [(0, jsx_runtime_1.jsx)("strong", { children: "Senha:" }), " ", password] })] }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: text, children: "Pode aceder \u00E0 plataforma usando o link abaixo:" }), (0, jsx_runtime_1.jsx)(components_1.Section, { style: { textAlign: "center", margin: "30px 0" }, children: (0, jsx_runtime_1.jsx)("a", { href: loginUrl, style: button, children: "Aceder \u00E0 Plataforma" }) }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: textSmall, children: "Recomendamos que altere a sua senha ap\u00F3s o primeiro login para maior seguran\u00E7a." }), (0, jsx_runtime_1.jsx)(components_1.Hr, { style: hr }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: footer, children: ["\u00A9 ", new Date().getFullYear(), " ", platformName, ". Todos os direitos reservados."] })] }) })] }));
};
exports.UserRegistrationTemplate = UserRegistrationTemplate;
const main = {
    backgroundColor: "#f5f7fa",
    fontFamily: "Helvetica, Arial, sans-serif",
};
const container = {
    margin: "30px auto",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    maxWidth: "520px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};
const heading = {
    fontSize: "22px",
    fontWeight: "600",
    textAlign: "center",
    color: "#222",
};
const text = {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#444",
    marginBottom: "16px",
};
const textSmall = {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#666",
    marginBottom: "16px",
    textAlign: "center",
};
const credentialsBox = {
    backgroundColor: "#f1f5f9",
    padding: "16px",
    borderRadius: "6px",
    margin: "20px 0",
};
const credential = {
    fontSize: "15px",
    color: "#333",
    marginBottom: "6px",
};
const button = {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "6px",
    fontSize: "16px",
    textDecoration: "none",
    display: "inline-block",
};
const hr = {
    border: "none",
    borderTop: "1px solid #eaeaea",
    margin: "24px 0",
};
const footer = {
    fontSize: "12px",
    color: "#999",
    textAlign: "center",
};
//# sourceMappingURL=user-registration.js.map