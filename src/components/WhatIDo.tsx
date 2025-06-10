import React from 'react'

export default function WhatIDo() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-center text-4xl font-semibold mb-4">Let’s Build Something Great Together – Here’s How I Can Help</h2>
      <div className='grid grid-cols-3 gap-4'>
        <div>
            <h3>Full-Stack App Development</h3>
            <p>I build powerful web applications using Laravel as the backend framework and Vue.js or React for modern, interactive frontends. Whether it's an admin dashboard, a booking system, or a customer portal, I can deliver clean, maintainable, and responsive solutions.</p>
        </div>
        <div>
            <h3>DevOps & Automation</h3>
            <p>I streamline your development and deployment process using Docker, GitHub Actions, and CI/CD pipelines. This helps you deploy faster with fewer bugs and ensures your team has a consistent and reproducible environment — whether it's for testing, staging, or production.</p>
        </div>
        <div>
            <h3>AI Feature Integration</h3>
            <p>Want to add AI to your app? I can integrate OpenAI, Gemini, or other LLM APIs into your Laravel or Node.js backend to enable features like smart chatbots, content suggestions, or semantic search — without needing a separate AI team.</p>
        </div>
        <div>
            <h3>Custom eCommerce Solutions</h3>
            <p>I create tailored eCommerce platforms using Laravel or frameworks like Bagisto. From simple products to configurable bundles, tax rules, inventory management, and secure checkout systems, I build everything needed for a seamless shopping experience.</p>
        </div>
        <div>
            <h3>Multi-Tenant SaaS Setup</h3>
            <p>If you're launching a SaaS product, I can help set up multi-tenancy using Laravel — with isolated databases, dynamic routing, tenant-aware middleware, and scalable architecture. Ideal for tools serving multiple businesses or organizations.</p>
        </div>
        <div>
            <h3>API Development & Integrations</h3>
            <p>I create secure, well-documented RESTful APIs and handle third-party integrations (e.g., payment gateways like Authorize.Net & PayPal, email services, CRMs like ActiveCampaign, and more), enabling seamless communication between services.</p>
        </div>
      </div>
    </section>
  )
}
