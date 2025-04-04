// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle form submission with loading state
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Generating...';
            }
        });
    }

    // Handle favorite button animation
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            // Add a heart animation
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart';
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.color = '#dc3545';
            heart.style.fontSize = '2rem';
            heart.style.opacity = '0';
            heart.style.transition = 'all 0.3s ease';
            
            this.appendChild(heart);
            
            setTimeout(() => {
                heart.style.opacity = '1';
                heart.style.transform = 'translate(-50%, -50%) scale(1.5)';
                
                setTimeout(() => {
                    heart.remove();
                }, 300);
            }, 50);
        });
    });

    // Handle image loading
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });

    // Handle infinite scroll for image history
    let loading = false;
    let page = 1;
    const loadMoreImages = () => {
        if (loading) return;
        
        loading = true;
        const container = document.querySelector('.image-grid');
        if (!container) return;
        
        const nextPage = page + 1;
        fetch(`/api/images/?page=${nextPage}`)
            .then(response => response.json())
            .then(data => {
                if (data.images.length > 0) {
                    data.images.forEach(image => {
                        const card = createImageCard(image);
                        container.appendChild(card);
                    });
                    page = nextPage;
                }
            })
            .finally(() => {
                loading = false;
            });
    };

    // Intersection Observer for infinite scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadMoreImages();
            }
        });
    });

    const sentinel = document.querySelector('.sentinel');
    if (sentinel) {
        observer.observe(sentinel);
    }

    // Handle image download
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const imageUrl = this.dataset.url;
            const imageName = this.dataset.name || 'generated-image';
            
            fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${imageName}.png`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                });
        });
    });

    // Show loading state when generating image
    const generateForm = document.getElementById('generate-form');
    const loadingIndicator = document.getElementById('loading');
    
    if (generateForm && loadingIndicator) {
        generateForm.addEventListener('submit', function() {
            loadingIndicator.classList.add('active');
        });
    }
});

// Helper function to create image cards
function createImageCard(image) {
    const card = document.createElement('div');
    card.className = 'card h-100';
    card.innerHTML = `
        <img src="${image.url}" class="card-img-top" alt="${image.prompt}">
        <div class="card-body">
            <p class="card-text small text-truncate">${image.prompt}</p>
            <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">${new Date(image.created_at).toLocaleDateString()}</small>
                <div>
                    <a href="/image/${image.id}/" class="btn btn-sm btn-outline-primary">
                        <i class="fas fa-eye"></i>
                    </a>
                    <a href="${image.url}" class="btn btn-sm btn-outline-success download-btn" data-url="${image.url}" data-name="${image.prompt}">
                        <i class="fas fa-download"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
    return card;
}

// Preview image before upload
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        const preview = document.getElementById('image-preview');
        
        reader.onload = function(e) {
            preview.src = e.target.result;
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Toggle favorite button
function toggleFavorite(button) {
    const icon = button.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        button.classList.replace('btn-outline-danger', 'btn-danger');
    } else {
        icon.classList.replace('fas', 'far');
        button.classList.replace('btn-danger', 'btn-outline-danger');
    }
} 