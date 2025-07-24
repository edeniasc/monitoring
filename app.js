// app.js
import { API_BASE } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const workerLoginForm = document.getElementById('workerLoginForm');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const workerLogoutBtn = document.getElementById('workerLogoutBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    const selectProjectBtn = document.getElementById('selectProjectBtn');
    const projectIdInput = document.getElementById('projectIdInput');
    const availableProjects = document.getElementById('availableProjects');
    const changeProjectBtn = document.getElementById('changeProjectBtn');
    const completeWorkBtn = document.getElementById('completeWorkBtn');
    const createProjectBtn = document.getElementById('createProjectBtn');
    const cancelCreateBtn = document.getElementById('cancelCreateBtn');
    const createProjectForm = document.getElementById('createProjectForm');

    workerLoginForm.addEventListener('submit', handleWorkerLogin);
    adminLoginForm.addEventListener('submit', handleAdminLogin);
    workerLogoutBtn.addEventListener('click', logout);
    adminLogoutBtn.addEventListener('click', logout);
    selectProjectBtn.addEventListener('click', selectProject);
    projectIdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            selectProject();
        }
    });
    changeProjectBtn.addEventListener('click', changeProject);
    completeWorkBtn.addEventListener('click', openCompleteWorkModal);
    createProjectBtn.addEventListener('click', openCreateProjectModal);
    cancelCreateBtn.addEventListener('click', closeCreateProjectModal);
    createProjectForm.addEventListener('submit', createProject);

    function handleWorkerLogin(event) {
        event.preventDefault();
        const name = document.getElementById('workerName').value.trim();
        const employeeNumber = document.getElementById('employeeNumber').value.trim();

        if (name && employeeNumber) {
            console.log('Worker logged in:', { name, employeeNumber });
            localStorage.setItem('worker', JSON.stringify({ name, employeeNumber }));
            alert(`환영합니다, ${name}님`);
        }
    }

    function handleAdminLogin(event) {
        event.preventDefault();
        const adminId = document.getElementById('adminId').value.trim();
        const password = document.getElementById('adminPassword').value.trim();

        if (adminId === 'ADMIN' && password === '12345678') {
            console.log('Admin logged in:', { adminId });
            localStorage.setItem('admin', adminId);
            loadProjects();
        } else {
            alert('Invalid admin credentials');
        }
    }

    function logout() {
        localStorage.clear();
        alert('로그아웃 되었습니다.');
    }

    function loadProjects() {
        fetch(`${API_BASE}/api/admin/projects`)
            .then(res => res.json())
            .then(projects => {
                console.log('Projects:', projects);
                renderAvailableProjects(projects);
            })
            .catch(err => {
                console.error('Failed to load projects:', err);
                alert('프로젝트를 불러올 수 없습니다.');
            });
    }

    function selectProject() {
        const projectId = projectIdInput.value.trim();
        if (!projectId) return;

        fetch(`${API_BASE}/api/projects/${projectId}`)
            .then(res => {
                if (!res.ok) throw new Error('Project not found');
                return res.json();
            })
            .then(project => {
                console.log('Selected project:', project);
                alert(`프로젝트 선택됨: ${project.name}`);
            })
            .catch(err => {
                console.error(err);
                alert('유효하지 않은 프로젝트 ID입니다.');
            });
    }

    function changeProject() {
        alert('프로젝트를 변경합니다.');
    }

    function openCompleteWorkModal() {
        alert('작업 완료 창 열림');
    }

    function closeCompleteWorkModal() {
        alert('작업 완료 창 닫힘');
    }

    function openCreateProjectModal() {
        alert('프로젝트 생성 창 열림');
    }

    function closeCreateProjectModal() {
        alert('프로젝트 생성 창 닫힘');
    }

    function createProject(event) {
        event.preventDefault();
        const name = document.getElementById('newProjectName').value.trim();
        const id = document.getElementById('newProjectId').value.trim();

        if (name && id) {
            const newProject = {
                name,
                id,
                status: 'active',
                createdAt: new Date(),
                createdBy: localStorage.getItem('admin') || 'Unknown',
                processes: [] // ← add actual steps if needed
            };

            fetch(`${API_BASE}/api/admin/projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProject)
            })
            .then(res => res.json())
            .then(data => {
                console.log('Project created:', data);
                alert(`프로젝트 "${name}" 생성 완료`);
                closeCreateProjectModal();
                loadProjects();
            })
            .catch(err => {
                console.error(err);
                alert('프로젝트 생성 실패');
            });
        }
    }

    function renderAvailableProjects(projects) {
        if (!availableProjects) return;

        availableProjects.innerHTML = projects.map(p => `
            <button class="btn btn-outline btn-sm" onclick="selectProjectById('${p.id}')">${p.id}</button>
        `).join('');
    }

    window.selectProjectById = function(id) {
        projectIdInput.value = id;
        selectProject();
    };
});
