// 获取DOM元素
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startDateInput = document.getElementById('start-date');
const setDateButton = document.getElementById('set-date');
const progressBar = document.getElementById('progress-bar');
const nextMilestone = document.getElementById('next-milestone');
const motivationText = document.getElementById('motivation-text');

// 设置默认日期为今天
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
startDateInput.value = formattedDate;

// 存储开始日期
let startDate = localStorage.getItem('startDate') || formattedDate;
startDateInput.value = startDate;

// 动机语录数组
const motivations = [
    "自律是通往卓越的黄金之路。",
    "每一次克制都是灵魂的一次升华。",
    "内心的宁静，源于对自我的完全掌控。",
    "真正的奢华，是拥有不被欲望支配的自由。",
    "坚持自律，犹如雕琢钻石，愈磨愈亮。",
    "高贵的灵魂，来自于对自我的严格要求。",
    "自我约束的艺术，成就非凡的人生。",
    "意志如钢铁，欲望如尘土，强者自知。",
    "每一天的坚持，都是为自己加冕的过程。",
    "克制的力量，塑造非凡的灵魂。",
    "自律者，如同黑夜中的明灯，照亮自己也照亮他人。",
    "生命的尊严，在于掌控自己的欲望，而非被欲望所掌控。"
];

// 里程碑数组（天数）
const milestones = [7, 14, 30, 60, 90, 180, 365];

// 更新计时器
function updateCounter() {
    const now = new Date();
    const start = new Date(startDate);
    
    // 计算时间差
    const timeDiff = now - start;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // 更新DOM
    daysElement.textContent = daysDiff;
    hoursElement.textContent = hoursDiff.toString().padStart(2, '0');
    minutesElement.textContent = minutesDiff.toString().padStart(2, '0');
    secondsElement.textContent = secondsDiff.toString().padStart(2, '0');
    
    // 更新动机语录（每天更换一次）
    const dayIndex = Math.floor(daysDiff % motivations.length);
    motivationText.textContent = motivations[dayIndex];
    
    // 更新进度条和下一个里程碑
    updateProgressAndMilestone(daysDiff);
    
    // 添加动画效果
    if (secondsDiff === 0) {
        daysElement.classList.add('pulse');
        setTimeout(() => {
            daysElement.classList.remove('pulse');
        }, 1000);
    }
}

// 更新进度条和下一个里程碑
function updateProgressAndMilestone(days) {
    // 找到下一个里程碑
    let nextMilestoneValue = milestones.find(m => m > days) || milestones[milestones.length - 1];
    let currentMilestoneIndex = milestones.findIndex(m => m > days);
    
    if (currentMilestoneIndex === -1) {
        // 已经超过所有里程碑
        nextMilestoneValue = milestones[milestones.length - 1];
        progressBar.style.width = '100%';
        nextMilestone.textContent = `${nextMilestoneValue}天 (已达成!)`;
    } else {
        // 计算当前进度
        let prevMilestone = currentMilestoneIndex > 0 ? milestones[currentMilestoneIndex - 1] : 0;
        let progress = ((days - prevMilestone) / (nextMilestoneValue - prevMilestone)) * 100;
        progressBar.style.width = `${progress}%`;
        nextMilestone.textContent = `${nextMilestoneValue}天`;
    }
}

// 设置开始日期
function setStartDate() {
    const newStartDate = startDateInput.value;
    if (newStartDate) {
        startDate = newStartDate;
        localStorage.setItem('startDate', startDate);
        updateCounter();
        
        // 添加确认动画
        const btnText = setDateButton.querySelector('.btn-text');
        const btnIcon = setDateButton.querySelector('.btn-icon i');
        
        btnText.textContent = "已保存!";
        btnIcon.className = "fas fa-check-circle";
        setDateButton.classList.add('success');
        
        setTimeout(() => {
            btnText.textContent = "确定";
            btnIcon.className = "fas fa-check";
            setDateButton.classList.remove('success');
        }, 2000);
    }
}

// 添加事件监听器
setDateButton.addEventListener('click', setStartDate);

// 初始化
updateCounter();

// 每秒更新一次
setInterval(updateCounter, 1000);

// 添加CSS动画类
document.head.insertAdjacentHTML('beforeend', `
<style>
.pulse {
    animation: pulse 1s;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

.success {
    background: linear-gradient(135deg, var(--success-color), #6ab46a) !important;
}

.shimmer {
    position: relative;
    overflow: hidden;
}

.shimmer::after {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 50%;
    height: 300%;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%) rotate(30deg);
    }
    100% {
        transform: translateX(200%) rotate(30deg);
    }
}

.float {
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0px);
    }
}
</style>`);

// 添加高级动画效果
function addLuxuryEffects() {
    // 添加闪光效果到计数器
    document.querySelector('.counter-frame').classList.add('shimmer');
    
    // 添加浮动效果到图标
    document.querySelectorAll('.milestone-icon, .quote-marks, .divider-icon').forEach(el => {
        el.classList.add('float');
    });
    
    // 添加进入动画
    const card = document.querySelector('.card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'opacity 1s ease, transform 1s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 300);
}

// 页面加载完成后添加效果
window.addEventListener('load', addLuxuryEffects);