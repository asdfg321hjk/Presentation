// Presentation JavaScript
class PresentationController {
  constructor() {
    this.currentSlide = 0
    this.slides = [
      { id: 1, title: "Introduction", subtitle: "Meet Greenice - Your Trusted Development Partner" },
      { id: 2, title: "Understanding the Project", subtitle: "GymBuddies - Fitness App Vision" },
      { id: 3, title: "Our Approach", subtitle: "Proven Development Process" },
      { id: 4, title: "Timeline & Investment", subtitle: "Transparent Pricing & Effort" },
      { id: 5, title: "Our Team", subtitle: "Expert In-House Professionals" },
      { id: 6, title: "Peace of Mind", subtitle: "3-Month Warranty Included" },
      { id: 7, title: "Next Steps", subtitle: "Let's Make It Happen" },
    ]

    this.init()
  }

  init() {
    this.generateNavigation()
    this.generateIndicators()
    this.bindEvents()
    this.updateSlide()
  }

  generateNavigation() {
    const nav = document.getElementById("slideNavigation")
    nav.innerHTML = ""

    this.slides.forEach((slide, index) => {
      const button = document.createElement("button")
      button.className = `slide-nav-btn px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200`
      button.textContent = `${slide.id}. ${slide.title}`
      button.addEventListener("click", () => this.goToSlide(index))
      nav.appendChild(button)
    })
  }

  generateIndicators() {
    const indicators = document.getElementById("slideIndicators")
    indicators.innerHTML = ""

    this.slides.forEach((_, index) => {
      const indicator = document.createElement("button")
      indicator.className = `slide-indicator w-3 h-3 rounded-full transition-colors bg-gray-300`
      indicator.addEventListener("click", () => this.goToSlide(index))
      indicators.appendChild(indicator)
    })
  }

  bindEvents() {
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")

    prevBtn.addEventListener("click", () => this.prevSlide())
    nextBtn.addEventListener("click", () => this.nextSlide())

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide()
      if (e.key === "ArrowRight") this.nextSlide()
    })
  }

  updateSlide() {
    // Hide all slides
    document.querySelectorAll(".slide").forEach((slide) => {
      slide.classList.remove("active")
    })

    // Show current slide
    const currentSlideElement = document.getElementById(`slide-${this.currentSlide}`)
    if (currentSlideElement) {
      currentSlideElement.classList.add("active")
    }

    // Update navigation buttons
    this.updateNavigation()

    // Update indicators
    this.updateIndicators()

    // Update prev/next buttons
    this.updateControls()
  }

  updateNavigation() {
    const navButtons = document.querySelectorAll(".slide-nav-btn")
    navButtons.forEach((button, index) => {
      if (index === this.currentSlide) {
        button.classList.add("active")
        button.classList.remove("bg-gray-100", "text-gray-600", "hover:bg-gray-200")
      } else {
        button.classList.remove("active")
        button.classList.add("bg-gray-100", "text-gray-600", "hover:bg-gray-200")
      }
    })
  }

  updateIndicators() {
    const indicators = document.querySelectorAll(".slide-indicator")
    indicators.forEach((indicator, index) => {
      if (index === this.currentSlide) {
        indicator.classList.add("active")
        indicator.classList.remove("bg-gray-300")
      } else {
        indicator.classList.remove("active")
        indicator.classList.add("bg-gray-300")
      }
    })
  }

  updateControls() {
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")

    // Update previous button
    if (this.currentSlide === 0) {
      prevBtn.disabled = true
      prevBtn.classList.add("opacity-50", "cursor-not-allowed")
    } else {
      prevBtn.disabled = false
      prevBtn.classList.remove("opacity-50", "cursor-not-allowed")
    }

    // Update next button
    if (this.currentSlide === this.slides.length - 1) {
      nextBtn.disabled = true
      nextBtn.classList.add("opacity-50", "cursor-not-allowed")
    } else {
      nextBtn.disabled = false
      nextBtn.classList.remove("opacity-50", "cursor-not-allowed")
    }
  }

  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlide = index
      this.updateSlide()
    }
  }

  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++
      this.updateSlide()
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--
      this.updateSlide()
    }
  }
}

// Initialize presentation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PresentationController()
})

// Add smooth scrolling for better UX
document.addEventListener("DOMContentLoaded", () => {
  // Add fade transition effect
  const style = document.createElement("style")
  style.textContent = `
        .slide {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        .slide.active {
            opacity: 1;
        }
    `
  document.head.appendChild(style)
})
