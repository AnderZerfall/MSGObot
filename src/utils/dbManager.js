import { redis } from '../kvClient.js';


export const saveUserByUsername = async (userId, username) => {
    try {
        const user = {
            userId,
            username
        };

        if (await redis.get(`user:${username}`)) {
            await redis.del(`user:${username}`)
        }

        await redis.set(`user:${username}`, JSON.stringify(user));
    } catch (error) {
        console.log(error.message);
    }
};

export const getUserByUsername = async (username) => {
    try {
        return await redis.get(`user:${username}`);
    } catch (error) {
        console.log(error.message);
    }
};

export const getApplications = async () => {
    const applications = [];

    try {
        const keys = await redis.keys('applicant:*');
        console.log(keys);
    
        for (const key of keys) {
            const value = await redis.get(key);
            console.log(value);

            if (value) {
                applications.push(value);
            }
        }

    } catch (error) {
        console.log(error.message); 
    }

    return applications;
} 

export const saveApplication = async (context, query, date) => {
    try {
        const application = {
            userId: context.from.id,
            username: context.from.username,
            query,
            date,
        };

        if (await redis.get(`applicant:${application.userId}`)) {
            await redis.del(`applicant:${application.userId}`);
        }
    
        await redis.set(`applicant:${application.userId}`, JSON.stringify(application));
        console.log('User data saved');
        console.log(redis.get(`applicant:${application.userId}`));
    } catch (error) {
        console.log(error.message); 
    }
}

export const getRequest = async userId => {
    const requests = [];

    try {
        const keys = await redis.keys(`request:${userId}`);
        console.log(keys);
    
        for (const key of keys) {
            const value = await redis.get(key);
            console.log(value);

            if (value) {
                requests.push(value);
            }
        }

    } catch (error) {
        console.log(error.message); 
    }

    return requests;
} 

export const saveRequest = async (context, date) => {
    try {

        const request = {
            userId: context.from.id,
            username: context.from.username,
            requestText: context.message.text,
            date,
        };

        await redis.set(`request:${request.userId}`, JSON.stringify(request));
    } catch (error) {
        console.log(error.message); 
    }
}

export const cleanApplications = async () => {
    const applications = getApplications();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 30);

    const applicationsToDelete = applications.filter(application => application.date >= currentDate);

    for (const application of applicationsToDelete) {
        await redis.delete(`applicant:${application.userId}`);
    }
};

export const cleanAnsweredApplications = async (application) => {
    await redis.delete(`applicant:${application.userId}`);
};