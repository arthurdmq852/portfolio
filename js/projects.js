// ── PROJECT DATA ──────────────────────────────────────────────
// Add your images to assets/ and reference them in the images array.
// Each entry supports multiple images — they appear as a scrollable gallery.

const projects = {
    pfsense: {
        title: "pfSense Firewall Setup",
        date: "2025",
        description: "Deployed and configured a pfSense firewall in a virtualised environment. Set up firewall rules, VLANs, and network segmentation to practice perimeter defence and traffic filtering. This project gave me a solid foundation in network architecture and the importance of correctly scoped access rules.",
        bullets: [
            "Virtualised pfSense on a local lab (VirtualBox)",
            "Configured WAN/LAN interfaces and stateful firewall rules",
            "Applied VLAN segmentation to isolate network zones",
            "Monitored traffic with the built-in packet capture tool",
        ],
        tags: ["pfSense", "Networking", "Firewall", "VLAN"],
        // Add image paths here — e.g. "assets/pfsense-dashboard.png"
        images: [
            // "assets/pfsense-1.png",
            // "assets/pfsense-2.png",
        ],
    },

    openvpn: {
        title: "OpenVPN Tunnel",
        date: "2025",
        description: "Set up a self-hosted OpenVPN server to establish encrypted tunnels between remote clients and a private network. The project focused on understanding PKI trust chains and the full lifecycle of certificate management, from CA creation to client distribution.",
        bullets: [
            "Generated a CA and client/server certificates with EasyRSA",
            "Configured OpenVPN server and client .ovpn profiles",
            "Enabled TLS authentication with a pre-shared key (tls-auth)",
            "Tested encrypted traffic and verified tunnel integrity with Wireshark",
        ],
        tags: ["OpenVPN", "PKI", "Encryption", "TLS"],
        images: [
            // "assets/openvpn-1.png",
        ],
    },

    ssh: {
        title: "SSH Alias Configuration",
        date: "2025",
        description: "Learnt to manage multiple SSH connections efficiently using the ~/.ssh/config file. Rather than memorising IP addresses, ports, and usernames, I set up named aliases for every remote host. This also allowed me to explore more advanced SSH features like jump hosts and key pinning.",
        bullets: [
            "Defined host aliases with custom ports, users, and key paths",
            "Configured IdentityFile per host for key-based authentication",
            "Used ProxyJump for bastion host chaining",
            "Set ServerAliveInterval to keep sessions stable",
        ],
        tags: ["SSH", "Linux", "Sysadmin", "Security"],
        images: [
            // "assets/ssh-config.png",
        ],
    },
};

// ── MODAL LOGIC ───────────────────────────────────────────────

const modal      = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
const gallery    = document.getElementById("modal-gallery");
const modalTitle = document.getElementById("modal-title");
const modalDate  = document.getElementById("modal-date");
const modalDesc  = document.getElementById("modal-description");
const modalList  = document.getElementById("modal-bullets");
const modalTags  = document.getElementById("modal-tags");

function openModal(key) {
    const p = projects[key];
    if (!p) return;

    // Title & date
    modalTitle.textContent = p.title;
    modalDate.textContent  = p.date;

    // Description
    modalDesc.textContent = p.description;

    // Bullets
    modalList.innerHTML = p.bullets
        .map(b => `<li>${b}</li>`)
        .join("");

    // Tags
    modalTags.innerHTML = p.tags
        .map(t => `<span class="tag">${t}</span>`)
        .join("");

    // Gallery
    gallery.innerHTML = "";
    if (p.images && p.images.length > 0) {
        gallery.hidden = false;
        p.images.forEach((src, i) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${p.title} screenshot ${i + 1}`;
            img.loading = "lazy";
            gallery.appendChild(img);
        });
    } else {
        gallery.hidden = true;
    }

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
}

function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
}

// Open on card click
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.project));
    // Keyboard accessible
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") openModal(card.dataset.project);
    });
});

// Close button
modalClose.addEventListener("click", closeModal);

// Click outside modal box
modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
});

// Escape key
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
});
