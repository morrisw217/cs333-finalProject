For my final project, I created a react app that functions as the character customization aspect of a racing game (I might actually make the game one day, but who knows.) It uses mongoose for the database on the backend. The potential structure of that database is as follows:

==RacingDB==================================

    =====Users==============================

        =====UserOne========================

            Username: personOne

            Password: 28k7*nN0l3dFd76% //Passwords are hashed

            =====Characters=================

                [
                    name: characterNameOne

                    carModelURL: Car2.png

                    characterModelURL: Model13.png
                ]

                [
                    name: characterNameTwo

                    carModelURL: Car1.png

                    characterModelURL: Model23.png
                ]

                    ......

            ================================

        =====UserTwo========================
                    ......
        =====UserThree======================
                    ......

    ========================================

============================================

There are POST endpoints for creating user accounts, logging in, and adding characters to the DB.
There are GET endpoints for retrieving character information from the DB.

I also created a function that fetches data from the Famous Quotes API once the user is in the loggedIn state.

For more instructions on how to run this locally, cd into both the Frontend and Backend folders and read the README.md files for both.


