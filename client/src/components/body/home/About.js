import React from 'react'
import './home.css'

function About() {
    return (
        <div className="home_page">
            <h2>Hello everyone!</h2>
            <p>
                This App is about taking and management appointments between our
                entreprise and others clients.To have an idea about our entreprise
                please click on the logo below!
            </p>
            <a href="https://www.scantech-group.com/scantech/" target="_blank"
                rel="noopener noreferrer"><img src="https://www.scantech-group.com/scantech/wp-content/uploads/2020/04/logo-scantech.png"
                    height="100px" position="center" /></a>

        </div>
    )
}

export default About