// --- LOGIN STATE MANAGEMENT ---
function updateAccountButton() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const btn = document.querySelector('.create-account-btn');
  if (!btn) return;
  if (isLoggedIn) {
    btn.textContent = 'My Account';
    btn.onclick = function() { window.location.href = 'user.html'; };
  } else {
    btn.textContent = 'Create Account';
    btn.onclick = function() { openModal('registerModal'); };
  }
}

function fakeLogin() {
  localStorage.setItem('isLoggedIn', 'true');
  updateAccountButton();
  closeModal();
  window.location.href = 'user.html';
}

function fakeLogout() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'home.html';
}

// Call on every page load
window.addEventListener('DOMContentLoaded', updateAccountButton);
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  const mainContent = document.querySelector('.main-content');
  if (modal && mainContent) {
    modal.style.display = 'flex';
    mainContent.classList.add('blur');
  } else {
    console.error(`Modal with ID ${modalId} or main-content not found`);
  }
}

function closeModal() {
  const modals = [
    document.getElementById('registerModal'),
    document.getElementById('loginModal'),
    document.getElementById('videoModal')
  ];
  const mainContent = document.querySelector('.main-content');
  modals.forEach(modal => {
    if (modal) {
      modal.style.display = 'none';
      const iframe = modal.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        iframe.src = src; // Resetting src stops the video
      }
    }
  });
  if (mainContent) {
    mainContent.classList.remove('blur');
  }
}

function showRegisterModal() {
  const registerModal = document.getElementById('registerModal');
  const loginModal = document.getElementById('loginModal');
  const videoModal = document.getElementById('videoModal');
  if (registerModal) {
    if (loginModal) loginModal.style.display = 'none';
    if (videoModal) videoModal.style.display = 'none';
    registerModal.style.display = 'flex';
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.classList.add('blur');
  } else {
    console.error('Register modal not found');
  }
}

function showLoginModal() {
  const registerModal = document.getElementById('registerModal');
  const loginModal = document.getElementById('loginModal');
  const videoModal = document.getElementById('videoModal');
  if (loginModal) {
    if (registerModal) registerModal.style.display = 'none';
    if (videoModal) videoModal.style.display = 'none';
    loginModal.style.display = 'flex';
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.classList.add('blur');
  } else {
    console.error('Login modal not found');
  }
}

function showVideoModal(element) {
  const videoModal = document.getElementById('videoModal');
  const registerModal = document.getElementById('registerModal');
  const loginModal = document.getElementById('loginModal');
  const iframe = document.getElementById('videoIframe');
  if (videoModal && iframe) {
    const videoId = element.getAttribute('data-video-id');
    if (videoId) {
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      if (registerModal) registerModal.style.display = 'none';
      if (loginModal) loginModal.style.display = 'none';
      videoModal.style.display = 'flex';
      const mainContent = document.querySelector('.main-content');
      if (mainContent) mainContent.classList.add('blur');
    } else {
      console.error('Video ID not found on element');
    }
  } else {
    console.error('Video modal or iframe not found');
  }
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
  const modals = {
    registerModal: document.getElementById('registerModal'),
    loginModal: document.getElementById('loginModal'),
    videoModal: document.getElementById('videoModal')
  };
  if (event.target === modals.registerModal || event.target === modals.loginModal || event.target === modals.videoModal) {
    closeModal();
  }
};

// Close modal on Esc key press
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});