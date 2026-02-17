/* SaveMore - Dashboard Logic & Simulation */

document.addEventListener('DOMContentLoaded', () => {
    // Simple Modal System
    const createModal = (title, content, actions) => {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay fade-in';
        modalOverlay.innerHTML = `
            <div class="modal-card">
                <h3>${title}</h3>
                <div class="modal-content">${content}</div>
                <div class="modal-actions">${actions}</div>
            </div>
        `;
        document.body.appendChild(modalOverlay);

        // Add styles dynamically for quick implementation
        const styles = `
            .modal-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(4, 8, 19, 0.9);
                display: flex; align-items: center; justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(8px);
            }
            .modal-card {
                background: var(--bg-navy-light);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 40px; border-radius: 24px;
                max-width: 480px; width: 90%;
            }
            .modal-card h3 { margin-bottom: 16px; font-size: 24px; }
            .modal-content { color: var(--text-secondary); margin-bottom: 32px; }
            .modal-actions { display: flex; gap: 16px; }
        `;
        
        if (!document.getElementById('modal-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'modal-styles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        }

        return modalOverlay;
    };

    // Withdrawal Logic Simulation
    const withdrawBtn = document.querySelector('.btn-outline');
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', () => {
            const modal = createModal(
                "Smart Lock Restriction",
                "You set a withdrawal rule for this goal: <strong>'No withdrawals until June 1st'</strong>. Withdrawing now will reset your 14-day savings streak.",
                `
                <button class="btn btn-primary" id="modal-confirm">Confirm Reset & Withdraw</button>
                <button class="btn btn-outline" id="modal-cancel">Keep Saving</button>
                `
            );

            document.getElementById('modal-cancel').onclick = () => modal.remove();
            document.getElementById('modal-confirm').onclick = () => {
                alert('Withdrawal processed. Savings streak reset.');
                modal.remove();
            };
        });
    }

    // Add Money Simulation
    const addBtn = document.querySelector('.btn-primary');
    if (addBtn) {
        // ... simple logic could go here
    }
});
