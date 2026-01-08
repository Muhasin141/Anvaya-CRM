# Anvaya-CRM

Anvaya is a full-stack CRM web application built using the MERN Stack that helps teams manage leads, assign sales agents, track lead progress, and analyze pipeline performance through dashboards and reports.The system is designed to provide a simple, structured, and collaborative workflow for sales teams and growing businesses.


---
## Demo Link

[Live Demo](https://anvaya-crm-plum.vercel.app/)

## Quick Start

---

``` 
git clone https://github.com/Muhasin141/Anvaya-CRM.git
cd Anvaya-CRM
npm install
npm run dev   # or `npm start`
```
---
## Technologies 
- React JS
- React Router
- Node JS
- Express 
- MongoDB
- CSS
- Bootstrap
---

## Demo Video

Watch a walkthrough (5-7 minutes) of all the major features of this app:
[Video Link](https://drive.google.com/file/d/1jFy3UCSZgd6zBYzA0iKYgKwkWzpiIKPI/view?usp=drivesdk)

---
## Features 

**Dashboard**
- Lead count by status (New, Contacted, Qualified, etc.)
- Quick filters for pipeline overview
- Add new lead shortcut

**Lead Management**
- View full lead profile
- Assign / update sales agent
- Track priority & time to close
- Add comments with author & timestamp

**Lead List View**
- Status, agent & priority filters
- Sorting by priority / time-to-close

**Sales Agent Module**
- Agent list & contact details
- Add new agent

**Reports & Analytics**
Includes:
- Pipeline vs Closed leads (Pie Chart)
- Leads by sales agent (Bar Chart)
- Status distribution chart

---
## API References 

### ***GET /api/leads***
List all the Leads<br>
Sample Response:<br>
```[{name,source,sales agent,status,tags,timeToCloss,priority},....]```

### *** POST /api/leads***
Create Lead<br>
Sample Response:<br>
```[{name,source,sales agent,status,tags,timeToCloss,priority}]```


### ***GET /api/leads/:id***
Get details of one lead <br>
Sample Response:<br>
```[{name,source,sales agent,status,tags,timeToCloss,priority}]```

### ***PUT /api/leads/:id***
Update one lead <br>
Sample Response:<br>
```[{name,source,sales agent,status,tags,timeToCloss,priority}]```

### ***DELETE /api/leads/:id***
Delete one lead <br>
Sample Response:<br>
```[{name,source,sales agent,status,tags,timeToCloss,priority}]```

### ***GET /api/agents***
List all the sales agents<br>
Sample Response:<br>
```[{name,email, created At},....]```

### *** POST /api/agents***
Create Sales agent<br>
Sample Response:<br>
```[{name,email, created At}]```

### *** DELETE/api/agents/:id***
Delete Sales agent<br>
Sample Response:<br>
```[{name,email, created At}]```

## Contact 
For bugs or feature request, please reach out to muhasinalikhan@gmail.com
