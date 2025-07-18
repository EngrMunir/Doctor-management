import express from 'express';
import { UserRoutes } from '../../modules/User/user.route';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { ServiceRoutes } from '../../modules/Doctor/service.routes';
import { AvailabilityRoutes } from '../../modules/Availabilty/availability.routes';
import { AppointmentRoutes } from '../../modules/Appointment/appointment.routes';

const router = express.Router();

const moduleRoutes =[
    {
        path:'/users',
        route: UserRoutes
    },
    {
        path:'/auth',
        route:AuthRoutes
    },
    {
        path:'/doctor/services',
        route:ServiceRoutes
    },
    {
        path:'/doctor/availability',
        route:AvailabilityRoutes
    },
    {
        path:'/appointments',
        route:AppointmentRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;