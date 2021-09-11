import React from 'react'
import './Home.css'
export default function Home() {
    return (
        <div className="home-component">
            <main className="UI-parent custom-container">
                <section className="intro d-flex align-items-center">
                    <i className="bi bi-person-circle"></i>
                    <div className="intro-caption ms-4">
                        <h5>Welcome to Demo Account</h5>
                        <p className="mb-0">You are logged in as a demo user. All the changes you make will only be stored locally on your device.</p>
                    </div>
                </section>
                
                <section className="UI-main">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque sequi nostrum accusamus, animi doloribus id quibusdam tempore laudantium nemo, placeat repellat cumque odio quis ipsam sunt voluptas cupiditate labore eius!</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque sequi nostrum accusamus, animi doloribus id quibusdam tempore laudantium nemo, placeat repellat cumque odio quis ipsam sunt voluptas cupiditate labore eius!</p>
                </section>
                
            </main>
        </div>
    )
}
