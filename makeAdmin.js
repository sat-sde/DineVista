require('dotenv').config();
const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');

async function makeAdmin() {
    try {
        await mongoose.connect(config.dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        // Find the user we created earlier
        const user = await User.findOneAndUpdate(
            { email: 'teststripe@example.com' },
            { role: 'admin' },
            { new: true }
        );

        if (user) {
            console.log(`Successfully made ${user.email} an admin!`);
        } else {
            // Just make the first user an admin if the test user isn't found
            const firstUser = await User.findOneAndUpdate(
                {},
                { role: 'admin' },
                { new: true }
            );
            if (firstUser) {
                 console.log(`Successfully made ${firstUser.email} an admin!`);
            } else {
                 console.log("No users found to make admin.");
            }
        }
        process.exit(0);
    } catch (err) {
        console.error("Error making admin:", err);
        process.exit(1);
    }
}

makeAdmin();
