const projects = {
    pfsense: {
        title: "pfSense Firewall Setup",
        readme: "https://github.com/arthurdmq852/linux-b1/blob/main/tp/tp5/tp5.md",
        date: "2025",
        description: "Deployed and configured a pfSense firewall in a virtualised environment. Set up firewall rules, VLANs, and network segmentation to practice perimeter defence and traffic filtering. This project gave me a solid foundation in network architecture and the importance of correctly scoped access rules.",
        bullets: [
            "Virtualised pfSense on a local lab (VirtualBox)",
            "Configured WAN/LAN interfaces and stateful firewall rules",
            "Applied VLAN segmentation to isolate network zones",
            "Monitored traffic with the built-in packet capture tool",
        ],
        tags: ["pfSense", "Networking", "Firewall", "VLAN", "DMZ"],
        images: [
            "assets/screenshots/pfsense_website.png",
        ],
    },

    openvpn: {
        title: "OpenVPN Tunnel",
        readme: "https://github.com/arthurdmq852/linux-b1/blob/main/tp/tp6/tp6.md",
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
            "assets/openvpn.png"
        ],
    },

    ssh: {
        title: "SSH Alias Configuration",
        readme: "https://github.com/arthurdmq852/linux-b1/blob/main/tp/tp4/tp4.md",
        date: "2025",
        description: "Learnt to manage multiple SSH connections efficiently using the ~/.ssh/config file. Rather than memorising IP addresses, ports, and usernames, I set up named aliases for every remote host. This also allowed me to explore more advanced SSH features like jump hosts and key pinning.",
        bullets: [
            "Defined host aliases with custom ports, users, and key paths",
            "Configured IdentityFile per host for key-based authentication",
            "Used ProxyJump for bastion host chaining",
            "Set ServerAliveInterval to keep sessions stable",
        ],
        tags: ["SSH", "Linux", "Security"],
        images: [
            "assets/ssh.png",
        ],
    },

    rust: {
        title: "Currently : Learning Rust",
        date: "2026",
        description: "Work In Progress... (Will be updated soon) ",
        bullets: [
            "...",
            "...",
            "...",
            "...",
        ],
        tags: ["Rust", "Programming",],
        images: [
            "assets/rust.png",
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

    if (p.readme) {
        modalTags.innerHTML += `
        <a class="tag tag-github" href="${p.readme}" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
        </a>`;
}

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
