# FireStories

**Team Thunderbolts** – _Enhanced Fire TV Experience_
- Project Deployed To Vercel : https://fire-stories.vercel.app/
- Demonstration Video : https://youtu.be/TBnvfFpJIpo

## 🚀 Project Overview
FireStories is a social, human-first content recommendation layer for Fire TV. Instead of cold, impersonal AI suggestions, users clip 15–30‑second highlights of shows, add emojis or voice notes, and share them instantly with their private “Campfire” groups. Shared clips appear directly on the Fire TV interface for friends to watch, react, and discover together.

## 🌟 Key Features
- **Clip Capture & Tagging**: One-click capture of 15–30s moments with title, emoji, and voice note support.
- **Campfire Groups**: Private social circles where friends share and view clips in-app and on Fire TV.
- **Deep-Link Playback**: Timestamp-based deep links that seek the OTT player—fully DRM-compliant.
- **Notifications**: Real-time alerts via in-app panel, push, email, and SMS using Amazon Pinpoint.
- **Account Management**: Profile settings, clan (Campfire) controls, and notification preferences.
  ## 🛠️ Installation & Setup
1. **Clone the Repo**
   ```bash
   git clone https://github.com/YourRepo/FireStories.git
   cd FireStories
   ```
2. **Installation and running**
   ```bash
   npm install
   npm run dev
   ```

## 🎥 Demo Usage
1. Open the FireStories web app on Fire TV Stick.
2. Switch to **Campfire** to view friends’ shared clips.
3. Play any clip directly or navigate to its full timestamp in the OTT app.
4. Clip your own moment in Prime or Netflix, tag it, and share to Campfire.
5. Check **Notifications** for real-time alerts.

## 💡 Problem Statement
Traditional AI-driven recommendation engines often feel cold and disconnected from real viewer emotions and social context. Research shows:
- 84% of users are influenced by friends’ recommendations vs. 68% by homepage suggestions.
- 51% of Gen Z prefer clip-based social watching with friends.

FireStories leverages social trust to surface authentic, friend-driven content.

## 📦 Prototype Architecture

For our hackathon prototype, we’ve implemented a lean, serverless design on AWS and Vercel:

- **Frontend (Web & Fire TV UI)**
  - Built in React Native and hosted on Vercel.
  - Integrates directly within the FireStories web app on Fire TV Stick.

- **Media Storage & Delivery**
  - **S3 Buckets** (SSE-KMS) store raw 15–30s clip segments and generated thumbnails.
  - **CloudFront CDN** caches clips for low-latency playback in our demo environment.

- **Data & API**
  - **DynamoDB** holds prototype tables for Users, Camps (Campfires), and Clips.
  - **AWS Lambda** functions behind API Gateway handle clip metadata, user actions, and basic notifications.
  - **API Gateway** exposes REST endpoints secured by Cognito authorizers.

- **Transcoding Workflow**
  - S3 Event triggers a Lambda + FFmpeg pipeline to generate HLS output at 360p for demo.
  - Thumbnails extracted via FFmpeg within the same Lambda function.

- **Notifications**
  - Basic in-app notification events driven by WebSockets (Socket.IO) on AWS Fargate.

This lightweight architecture allows rapid iteration, scales on demand during the hackathon, and demonstrates core FireStories functionality without a full production stack.



## 🛡️ Security & Compliance
- AWS Cognito for authentication and JWT validation.
- Encryption at rest (S3, DynamoDB SSE) and in transit (TLS).
- WAF & Shield guard against threats.
- Least-privilege IAM roles manage AWS resource access.

## 🌱 Future Roadmap
- Real-time synchronized clip-watching sessions.
- Story-style clip highlights and themes.
- Expand platform support (Android TV, web, Echo Show).
- Advanced analytics with Aurora PostgreSQL and BI dashboards.
  ## Team
- Dharmeshwar Sharma (Team Lead)
- Arnav Nigam
- Arnav Singhal
- Aryav Gupta

---

© 2025 Team Thunderbolts. Inspired by Amazon HackOn 2025.
