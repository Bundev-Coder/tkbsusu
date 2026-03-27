// ==========================================
// DỮ LIỆU MẪU (JSON DATA)
// isExtra: Học thêm (Tím)
// isReview: Ôn thi tốt nghiệp (Cam)
// ==========================================
window.SCHEDULE_DATA = {
  1: [ // Monday
    { id: 'm1', name: 'Sinh hoạt', start: '07:00', end: '07:45', room: 'Lớp học', icon: 'users' },
    { id: 'm2', name: 'Hoạt động Trải nghiệm', start: '07:47', end: '10:25', room: 'Lớp học', icon: 'users' },
    { id: 'm3', name: 'Ngữ văn', start: '14:17', end: '15:57', room: 'Lớp học', icon: 'book' },
    { id: 'm4', name: 'GDĐP 5', start: '16:00', end: '16:45', room: 'Lớp học', icon: 'book' },
    { id: 'm5', name: 'Ngữ văn', start: '18:30', end: '20:00', room: 'Lớp học thêm', icon: 'book', isExtra: true },
  ],
  2: [ // Tuesday
    { id: 't1', name: 'Anh Văn', start: '07:00', end: '08:32', room: 'Lớp học', icon: 'globe' },
    { id: 't2', name: 'KTNN', start: '08:52', end: '10:25', room: 'Phòng Thực hành', icon: 'leaf' },
    { id: 't3', name: 'Vật lý', start: '10:35', end: '11:20', room: 'Lớp học', icon: 'atom' },
    { id: 't4_rev', name: 'Ôn Lịch sử', start: '15:12', end: '16:45', room: 'Lớp học', icon: 'graduation', isReview: true },
  ],
  3: [ // Wednesday
    { id: 'w1', name: 'Tin học', start: '07:00', end: '08:32', room: 'Phòng Máy Tính', icon: 'laptop' },
    { id: 'w2', name: 'Vật lý', start: '08:52', end: '10:25', room: 'Lớp học', icon: 'atom' },
    { id: 'w3', name: 'Toán', start: '10:35', end: '11:20', room: 'Lớp học', icon: 'calculator' },
    { id: 'w4', name: 'Toán', start: '13:30', end: '15:02', room: 'Lớp học', icon: 'calculator' },
    { id: 'w5', name: 'Vật lý', start: '18:45', end: '20:15', room: 'Lớp học thêm', icon: 'atom', isExtra: true },
  ],
  4: [ // Thursday
    { id: 'th1', name: 'Ngữ văn', start: '07:00', end: '08:32', room: 'Lớp học', icon: 'book' },
    { id: 'th2', name: 'Anh Văn', start: '08:52', end: '09:37', room: 'Lớp học', icon: 'globe' },
    { id: 'th3', name: 'GDĐP 1', start: '09:40', end: '10:25', room: 'Lớp học', icon: 'book' },
  ],
  5: [ // Friday
    { id: 'f1', name: 'Toán', start: '07:00', end: '08:32', room: 'Lớp học', icon: 'calculator' },
    { id: 'f2', name: 'Ngữ văn', start: '08:52', end: '10:25', room: 'Lớp học', icon: 'book' },
    { id: 'f3', name: 'GDKTPL', start: '10:35', end: '11:20', room: 'Lớp học', icon: 'book' },
    { id: 'f4', name: 'Thể dục', start: '13:30', end: '15:02', room: 'Sân trường', icon: 'activity' },
    { id: 'f5_rev', name: 'Ôn GDKTPL', start: '15:12', end: '16:45', room: 'Lớp học', icon: 'graduation', isReview: true },
    { id: 'f6', name: 'Tiếng Anh', start: '17:00', end: '18:30', room: 'Lớp học thêm', icon: 'globe', isExtra: true },
  ],
  6: [ // Saturday
    { id: 's1', name: 'Toán', start: '07:00', end: '07:45', room: 'Lớp học', icon: 'calculator' },
    { id: 's2', name: 'Lịch sử', start: '07:47', end: '08:32', room: 'Lớp học', icon: 'book' },
    { id: 's3', name: 'GDKTPL', start: '08:52', end: '09:37', room: 'Lớp học', icon: 'book' },
    { id: 's4', name: 'Toán', start: '17:00', end: '18:30', room: 'Lớp học thêm', icon: 'calculator', isExtra: true },
    { id: 's5', name: 'Vật lý', start: '18:45', end: '20:15', room: 'Lớp học thêm', icon: 'atom', isExtra: true },
  ],
  0: [ // Sunday
    { id: 'su1', name: 'Tiếng Anh', start: '08:30', end: '10:00', room: 'Lớp học thêm', icon: 'globe', isExtra: true },
    { id: 'su2', name: 'Toán', start: '17:00', end: '18:30', room: 'Lớp học thêm', icon: 'calculator', isExtra: true },
    { id: 'su3', name: 'Ngữ văn', start: '18:30', end: '20:00', room: 'Lớp học thêm', icon: 'book', isExtra: true },
  ],
};

window.DAYS_OF_WEEK = [
  { id: 1, name: 'Thứ 2', short: 'T2' },
  { id: 2, name: 'Thứ 3', short: 'T3' },
  { id: 3, name: 'Thứ 4', short: 'T4' },
  { id: 4, name: 'Thứ 5', short: 'T5' },
  { id: 5, name: 'Thứ 6', short: 'T6' },
  { id: 6, name: 'Thứ 7', short: 'T7' },
  { id: 0, name: 'Chủ Nhật', short: 'CN' },
];

window.DAILY_QUOTES = {
  1: "Khởi đầu tuần mới thật rực rỡ và tràn đầy năng lượng nhé Su Su! ✨",
  2: "Thứ 3 vui vẻ! Hôm nay Su chắc chắn sẽ học thật tốt cho xem! 🌸",
  3: "Giữa tuần rồi, mỉm cười một cái cho ngày thêm rạng rỡ nha! ☀️",
  4: "Cố gắng lên Su Su ơi, sắp hoàn thành mục tiêu của tuần rồi! 🦋",
  5: "Thứ 6 rồi kìa! Hoàn thành tốt bài vở rồi chuẩn bị nghỉ ngơi thôi nào! 🍓",
  6: "Thứ 7 bận rộn nhưng đừng quên uống đủ nước và giữ sức khỏe nha! 💪",
  0: "Chủ nhật thảnh thơi! Nạp lại 100% năng lượng cho tuần mới nhé Su Su! 🧸",
};
