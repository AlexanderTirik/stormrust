import passport from 'passport';

export const steamMiddleware = passport.authenticate('steam', {
    session: false
})