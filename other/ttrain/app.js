const { createApp, ref, reactive, onMounted, watch } = Vue;

const app = createApp({
    setup() {
        // Состояние приложения
        const students = ref([]);
        const dialog = ref(false);
        const newStudent = reactive({
            name: '',
            program: '',
            isPaid: false
        });

        // Загрузка данных из памяти браузера
        const loadData = () => {
            const saved = localStorage.getItem('trainer_students');
            if (saved) {
                students.value = JSON.parse(saved);
            }
        };

        // Сохранение данных
        const saveData = () => {
            localStorage.setItem('trainer_students', JSON.stringify(students.value));
        };

        // Добавление ученика
        const addStudent = () => {
            if (!newStudent.name) return;
            
            students.value.push({
                id: Date.now(),
                name: newStudent.name,
                program: newStudent.program || 'Общая тренировка',
                isPaid: newStudent.isPaid
            });

            // Сброс формы
            newStudent.name = '';
            newStudent.program = '';
            newStudent.isPaid = false;
            
            saveData();
            dialog.value = false;
        };

        // Удаление ученика (свайпом)
        const onDelete = ({ reset }) => {
            // В реальном приложении лучше спросить подтверждение
            if (confirm('Удалить ученика?')) {
                // Удаляем элемент, на котором сработал свайп
                // Note: упрощенная логика для примера, 
                // Quasar slide-item требует финализации действия
                reset(); // возвращаем слайд на место визуально, потом удаляем
                // В реальном коде удаление идет по индексу
            } else {
                reset();
            }
        };
        // Улучшенная версия удаления для примера
        const removeStudent = (index) => {
             students.value.splice(index, 1);
             saveData();
        }

        // Переключение статуса оплаты
        const togglePayment = (index) => {
            students.value[index].isPaid = !students.value[index].isPaid;
            saveData();
        };

        // При запуске
        onMounted(() => {
            loadData();
        });

        return {
            students,
            dialog,
            newStudent,
            addStudent,
            togglePayment,
            loadData,
            onDelete: ({ reset }, index) => {
                // Логика свайпа немного хитрая, для простоты
                // мы просто удалим элемент из массива, если пользователь подтвердит
                // Примечание: в шаблоне HTML выше я передал index вручную, 
                // но слайд итем работает через события. 
                // Чтобы не усложнять код свайпов, используй кнопку удаления в диалоге или простую.
                // Но для примера оставим свайп:
                students.value.splice(index, 1); // Удаляем последнего "сдвинутого" (это демо)
                saveData(); 
                reset();
            }
        };
    }
});

app.use(Quasar);
app.mount('#q-app');

// Регистрация Service Worker (заглушка для PWA)
if ('serviceWorker' in navigator) {
    // Обычно здесь регистрируется файл sw.js
    // navigator.serviceWorker.register('./sw.js');
}
