/**
 * Pricing Page Logic
 * Handles currency toggling and plan selection.
 * 
 * Author: Themba Dev Team
 * Last Updated: December 2025
 */

document.addEventListener('DOMContentLoaded', () => {
    // Grab the toggle switch
    const billingToggle = document.getElementById('billing-cycle-toggle');

    // Define our pricing plans with ZAR values
    // Using psychological pricing (ending in 9) for better conversion
    const plans = [
        {
            id: 'free',
            monthly: 0,
            annual: 0, // Free is always free!
            elements: {
                amount: document.getElementById('price-free'),
                period: document.getElementById('period-free')
            }
        },
        {
            id: 'starter',
            monthly: 229,
            annual: 2199, // ~20% discount off (229 * 12)
            elements: {
                amount: document.getElementById('price-starter'),
                period: document.getElementById('period-starter'),
                note: document.getElementById('note-starter')
            }
        },
        {
            id: 'pro',
            monthly: 549,
            annual: 5270, // ~20% discount
            elements: {
                amount: document.getElementById('price-pro'),
                period: document.getElementById('period-pro'),
                note: document.getElementById('note-pro')
            }
        },
        {
            id: 'business',
            monthly: 1099,
            annual: 10550, // ~20% discount
            elements: {
                amount: document.getElementById('price-business'),
                period: document.getElementById('period-business'),
                note: document.getElementById('note-business')
            }
        },
        {
            id: 'enterprise',
            monthly: 1899,
            annual: 18230, // ~20% discount
            elements: {
                amount: document.getElementById('price-enterprise'),
                period: document.getElementById('period-enterprise'),
                note: document.getElementById('note-enterprise')
            }
        }
    ];

    // Helper to format numbers with commas (e.g. 1,000)
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Handle the toggle switch change
    billingToggle.addEventListener('change', function () {
        const isAnnual = this.checked;

        plans.forEach(plan => {
            // Skip the free plan updates for the note, but good to keep structure consistent
            if (plan.id === 'free') return;

            if (isAnnual) {
                // Animate the change slightly for a smooth feel
                plan.elements.amount.style.opacity = 0;

                setTimeout(() => {
                    plan.elements.amount.textContent = formatPrice(plan.annual);
                    plan.elements.period.textContent = '/yr';
                    plan.elements.note.textContent = `Billed annually (Save ~20%)`;
                    plan.elements.amount.style.opacity = 1;
                }, 200);

            } else {
                // Switch back to monthly
                plan.elements.amount.style.opacity = 0;

                setTimeout(() => {
                    plan.elements.amount.textContent = formatPrice(plan.monthly);
                    plan.elements.period.textContent = '/mo';
                    plan.elements.note.textContent = 'Billed monthly';
                    plan.elements.amount.style.opacity = 1;
                }, 200);
            }
        });
    });

    // Add smooth scrolling for any footer links (anchor links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Select Plan function
    window.selectPlan = (planName) => {
        console.log(`User selected plan: ${planName}`);

        const isAnnual = billingToggle.checked;
        const billingType = isAnnual ? 'Annually' : 'Monthly';

        // Create a custom modern modal instead of standard alert
        const modal = document.createElement('div');
        modal.className = 'custom-modal-overlay';
        modal.innerHTML = `
            <div class="custom-modal">
                <div class="modal-icon"><i class="fas fa-check-circle"></i></div>
                <h2>Great Choice!</h2>
                <p>You've selected the <strong>${planName}</strong> plan, billed <strong>${billingType}</strong>.</p>
                <div class="modal-buttons">
                    <button class="btn btn-primary" onclick="this.closest('.custom-modal-overlay').remove()">Continue to Checkout</button>
                    <button class="btn btn-link" onclick="this.closest('.custom-modal-overlay').remove()">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add some basic styles for the modal dynamically
        if (!document.getElementById('modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                .custom-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    backdrop-filter: blur(5px);
                    animation: fadeIn 0.3s ease;
                }
                .custom-modal {
                    background: white;
                    padding: 3rem;
                    border-radius: 1.5rem;
                    max-width: 450px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
                    animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .modal-icon {
                    font-size: 4rem;
                    color: #6366F1;
                    margin-bottom: 1.5rem;
                }
                .custom-modal h2 {
                    margin-bottom: 1rem;
                    color: #1E293B;
                }
                .custom-modal p {
                    color: #64748B;
                    margin-bottom: 2rem;
                }
                .modal-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .btn-link {
                    background: none;
                    border: none;
                    color: #64748B;
                    cursor: pointer;
                    font-weight: 500;
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `;
            document.head.appendChild(style);
        }
    };
});