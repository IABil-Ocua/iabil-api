{
"extends": "fastify-tsconfig",
"compilerOptions": {
"module": "NodeNext",
"moduleResolution": "NodeNext",
"jsx": "react-jsx",
"outDir": "dist",
"sourceMap": true,
"baseUrl": ".",
"paths": {
"@/_": ["src/_"]
},
"rewriteRelativeImportExtensions": true,
"strict": true
},
"include": [
"src/**/*.ts",
"src/**/*.tsx",
"prisma/**/*.ts"
],
"exclude": [
"node_modules",
"dist"
]
}
