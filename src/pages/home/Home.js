import React from 'react'
import CategoryList from '../../components/categoryList/CategoryList'
import NewTransaction from '../../components/newTransaction/NewTransaction'
import RecentTransaction from '../../components/recentTransaction/RecentTransaction'
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
                    <section className="category-list">
                        <CategoryList/>
                    </section>
                    <section className="transactions">
                        <NewTransaction/>
                    </section>
                    <section className="recent-transactions">
                        <RecentTransaction />
                    </section>
                </section>
                
            </main>
        </div>
    )
}
