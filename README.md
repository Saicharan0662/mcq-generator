# Question Generator

This is a question generator that can be used for the generation of <em><strong>"Multiple Choice Questions"</strong></em> with the provided link of any webpage". In the following sections this report describes the brief intro about the web application and implementation.

## Introduction
Multiple Choice Questions (MCQ) are frequently used to assess knowledge and comprehension of a given subject area in a variety of educational and professional assessments. Manually creating MCQs can be difficult and time-consuming. Therefore, creating a programme that creates MCQs automatically could be very useful for educators, trainers, and teachers. The design and implementation of an application that creates multiple-choice questions (MCQs) based on a specified topic will be covered in this paper. </br>
React and the Django REST framework work well together to create cutting-edge online apps. React enables a dynamic frontend user experience, while Django offers a safe backend API for data and authentication. A smooth user experience and a flexible development environment are provided by these technologies. The component-based architecture of React and the ORM provided by Django make it possible to construct scalable and effective web apps.

### Technologies Used
These are the following key technology used for building this project. The short description also given for every tech used.
- <strong>Django</strong>: Django and Django Rest Framework (DRF) are two popular open-source frameworks for web development in Python. A high-level web framework called Django makes it possible for programmers to create online applications rapidly and effectively. DRF is an extension of Django that provides powerful tools for building RESTful APIs. DRF, on the other hand, was created expressly for creating APIs. It has a number of capabilities that make it simple to handle login and authorisation, serialise and deserialize data, and create APIs with hyperlinks. DRF also comes with tools for creating API documentation, testing APIs, and versioning APIs. Overall, Django and DRF are excellent choices for building web applications and RESTful APIs in Python. 
- <strong>React.js</strong>: An open-source JavaScript package called React is used to create user interfaces. It was created by Facebook and is heavily utilised by developers worldwide. React is known for its high performance, flexibility, and ease of use. React is a free JavaScript package used to create user interfaces. Facebook created it, and developers all across the world use it extensively. High performance, adaptability, and user-friendliness are all hallmarks of React.
- <strong>MongoDB</strong>: MongoDB is a document-oriented NoSQL database used for high volume data storage.  MongoDB uses collections and documents rather than the tables and rows seen in conventional relational databases. The fundamental unit of data in MongoDB is a pair of key-value pairs, which make up documents.
- <strong>Material UI</strong>: Material UI is an open-source React component library that adheres to Google's Material Design principles. Material Design is a design language created by Google to provide a consistent and modern look and feel across all Google products and services. It is widely used in industry level applications.
- <strong>Tailwind CSS</strong>: Tailwind CSS is a popular open-source utility-first CSS framework. With the help of the robust and adaptable Tailwind CSS framework, developers can create bespoke designs quickly and effectively. Because of its distinctive stylistic methodology, the utility classes it offers, and the ease with which complicated designs may be created thanks to its great level of customization.

### Features
These are the following key features of the project.
- User authentication and authorization.
- MCQ generation from the provided link. This will save a lot of time for the teachers and trainers.
- The question can be downloaded in the form of a PDF file. The number of questions can be specified and the questions will be selected randomly.
- The user can create, read, update, and delete the questions.


## Implementation
This section described the different key libraries used in the project and implementation process. I have used the best software practices for the development of different modules of the project. </br>

### Libraries Used
These are different key libraries used in this project.
- <strong>Beautiful Soup</strong>: This is a python library used for scrapping the web data. There is seperate class implemented for the scrapper. It takes the web link and returns the processed data.
- <strong>Spacy</strong>: SpaCy is a Cython-written, open-source NLP library for Python. SpaCy was made to make it simple to construct systems for general-purpose natural language processing or information extraction. The "name entity recognition" is used for the generation of questions. Again there is a separate class implemented for this module. More on "name entity recognition" can be found [here](https://en.wikipedia.org/wiki/Named-entity_recognition).
- <strong>PyMongo</strong>: The suggested method for interacting with MongoDB from Python is PyMongo, a Python package that includes tools for doing so.

### Process

The following are the steps used to build this project.
- Initialized the Django project and built the basic authentication APIs and tested them.
- Implemented password encryption and JWT token generation.
- Built the basic landing, sign-up, and sign-in pages in React.js.
- Authentication APIs integrated and did necessary changes in views.
- The question generation module is built and tested with various edge cases.
- Developed user authorization feature using JWT token.
- Built CRUD APIs for the question_maker app in Django.
- Tested CRUD APIs and did necessary changes.
- Built the dashboard and other pages and integrated the CRUD API.
- Implemented download functionality for questions. 
- Worked on UI optimization and enhancement.
- Code refining

## Demo Video
Here is a demo video for the project.

https://user-images.githubusercontent.com/83747548/234657453-7f40c25c-8c90-4a05-82ca-df60728b2850.mp4

## Author
- Linkedin - [Sai Charan](https://www.linkedin.com/in/saicharan0662/)
