import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

export default NextAuth({
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CONSUMER_KEY!,
            clientSecret: process.env.TWITTER_CONSUMER_SECRET!,
            version: '2.0'
        })
    ],
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            console.log('check',{token, user, account, profile, isNewUser})
            if (profile) {
                token['userProfile'] = {
                    //@ts-ignore
                    // followersCount: profile.followers_count,
                    //@ts-ignore
                    
                    twitterHandle: profile.screen_name,
                    //@ts-ignore
                    // userID: profile.id
                };
            }
            if (account) {
                token['credentials'] = {
                    authToken: account.oauth_token,
                    authSecret: account.oauth_token_secret,
                }
            }
            return token
        },
        async session({session, token, user}) {
            // Send properties to the client, like an access_token from a provider.
            let userData = JSON.parse(JSON.stringify(token.userProfile))
            delete userData.userID;
            //@ts-ignore
            session.twitter = userData;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        error: '/error', // Error code passed in query string as ?error=
    }
    ,
    logger: {
        error(code, metadata) {
            console.log('error',code, metadata)
        },
        warn(code) {
            console.log('warn',code)
        },
        debug(code, metadata) {
         console.log('degug',code, metadata)
        }
      }
});