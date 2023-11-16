import bcryptjs from 'bcryptjs';
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/User';
import db from '../../../utils/db';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            if (user?.isVendor) token.isVendor = user.isVendor;
            return token;
        },
        async session({ session, token }) {
            if (token?._id) session.user._id = token._id;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            if (token?.isVendor) session.user.isVendor = token.isVendor;
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect();
                const user = await User.findOne({
                    email: credentials.email,
                });
                await db.disconnect();
                if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                    user.password = '';
                    credentials.password = '';

                    return { 
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: 'f',
                        isAdmin: user.isAdmin,
                        isVendor: user.isVendor
                    };
                }
                throw new Error('Invalid email or password');
            }
        })
    ]
})