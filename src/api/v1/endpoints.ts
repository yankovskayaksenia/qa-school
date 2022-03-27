export const v1Methods = {
    health: {
        health: 'health'
    },
    auth: {
        noAuth: 'no-auth',
        apiKey: 'api-key',
        basic: 'basic',
        jwt: 'jwt'
    },
    login: {
        signup: 'signup',
        signin: 'signin'
    },
    user: {
        teacher: 'teacher',
        teacherId: 'teacher/:id',
        teachers: 'teachers'
    },
    category: {
        category: 'category',
        categoryId: 'category/:id',
        categories: 'categories',
    },
    course: {
        courses: 'courses',
        coursesById: 'courses/:id',
        materials: 'courses/:courseId/materials',
        materialsById: 'courses/:courseId/materials/:materialId',
    }
};
