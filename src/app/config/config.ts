export var apiBaseUrl = 'http://localhost:8000';
export var apiRoutes = {
    user: {
        addNewUser: apiBaseUrl + "/api/user",
        updateUser: apiBaseUrl + "/api/user/update",
        updateUserPassword: apiBaseUrl + "/api/user/update/password",
        loginUser: apiBaseUrl + "/api/login",
        getSingleUser: apiBaseUrl + "/api/user/get",
        getAllUsers: apiBaseUrl + "/api/users"
    },
    project: {
        addProject: apiBaseUrl + "/api/project",
        getProjects: apiBaseUrl + "/api/projects",
        getProjecthandle: apiBaseUrl + "/api/project/handle",
        getAllProjects: apiBaseUrl + "/api/projects",
        getSingleProject: apiBaseUrl + "/api/project",
        updateProject: apiBaseUrl + "/api/project/update",
        deleteProject: apiBaseUrl + "/api/project"
    },
    task:{
        getPriority:apiBaseUrl + "/api/task/priorities",
        addTask:apiBaseUrl + "/api/task",
        deleteTask:apiBaseUrl + "/api/task",
        updateTask:apiBaseUrl + "/api/task",
        getTasks:apiBaseUrl + "/api/tasks",
        getSingleTask:apiBaseUrl + "/api/task/"
    },
    comment:{
        addComment:apiBaseUrl + "/api/comment",
        getComments:apiBaseUrl + "/api/comments"
    },
    status:{
        getAllStatuses:apiBaseUrl + "/api/statuses"
    },
    notification:{
        getNotifications:apiBaseUrl + "/api/notifications",
        clearNotification:apiBaseUrl + "/api/notifications"
    }
}    