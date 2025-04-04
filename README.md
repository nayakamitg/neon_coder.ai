# NeonCode.Ai

A modern AI-powered image generation platform with an interactive 3D interface. Built with Django, Three.js, and powered by AI image generation capabilities.

![NeonCode.Ai Screenshot](screenshots/screenshot.png)

## Features

- 🎨 AI-powered image generation
- 🌓 Light/Dark theme with dynamic 3D model color changes
- 🤖 Interactive 3D robot model with cursor-following shine effects
- 📱 Responsive design for all devices
- 🔒 User authentication and authorization
- 💾 Image history and favorites management
- 🎯 Custom cursor effects
- 🌟 Smooth animations and transitions

## Tech Stack

- **Backend**: Django
- **Frontend**: HTML5, CSS3, JavaScript
- **3D Graphics**: Three.js
- **UI Framework**: Bootstrap 5
- **Icons**: Font Awesome
- **Database**: SQLite (default)

## Prerequisites

- Python 3.8+
- pip (Python package manager)
- Virtual environment (recommended)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/NeonCode.Ai.git
cd NeonCode.Ai
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

7. Access the application at `http://127.0.0.1:8000/`

## Project Structure

```
NeonCode.Ai/
├── generator/              # Main app directory
│   ├── migrations/        # Database migrations
│   ├── static/           # Static files
│   │   ├── css/         # CSS files
│   │   ├── js/          # JavaScript files
│   │   └── models/      # 3D model files
│   ├── templates/        # HTML templates
│   ├── admin.py         # Admin configuration
│   ├── apps.py          # App configuration
│   ├── models.py        # Database models
│   ├── urls.py          # URL routing
│   └── views.py         # View functions
├── media/                # User-uploaded media
├── static/              # Static files
├── templates/           # Base templates
├── manage.py           # Django management script
└── requirements.txt    # Project dependencies
```

## Features in Detail

### 3D Interactive Interface
- Dynamic 3D robot model that responds to cursor movement
- Smooth shine effects that follow the cursor
- Theme-aware color changes for the 3D model
- Optimized performance with Three.js

### User Interface
- Clean, modern design with transparent elements
- Responsive layout for all screen sizes
- Custom cursor effects
- Smooth theme transitions
- Intuitive navigation

### Image Management
- Generate AI-powered images
- Save favorite images
- View generation history
- Download generated images

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Three.js for 3D graphics
- Django for the web framework
- Bootstrap for UI components
- Font Awesome for icons

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/NeonCode.Ai](https://github.com/yourusername/NeonCode.Ai) 