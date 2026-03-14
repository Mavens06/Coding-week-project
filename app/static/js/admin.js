/* ═══════════════════════════════════════════════════════════
   PediAppend – admin.js
   Script spécifique au panneau d'administration (admin.html).
   Gère : bascule du rôle administrateur et suppression
   d'un utilisateur via les endpoints API.
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

    /* ═══ BASCULE DU RÔLE ADMIN ═══ */
    /* Envoie un POST pour promouvoir/rétrograder un utilisateur */
    window.toggleAdmin = async function(userId) {
        if (!confirm('Modifier le rôle de cet utilisateur ?')) return;
        const res = await fetch(`/admin/toggle/${userId}`, { method: 'POST' });
        if (res.ok) location.reload();
        else {
            const data = await res.json();
            alert(data.error || 'Erreur');
        }
    };

    /* ═══ SUPPRESSION D'UN UTILISATEUR ═══ */
    /* Envoie un DELETE pour supprimer l'utilisateur et son historique */
    window.deleteUser = async function(userId, username) {
        if (!confirm(`Supprimer l'utilisateur "${username}" et tout son historique ?`)) return;
        const res = await fetch(`/admin/delete/${userId}`, { method: 'DELETE' });
        if (res.ok) {
            document.getElementById(`user-row-${userId}`).remove();
        } else {
            const data = await res.json();
            alert(data.error || 'Erreur');
        }
    };

});
