import Keyboard from "../components/keyboard-ui/Keyboard";
import Lesson from "../components/lesson-ui/Lesson";

const Practice = () => {
  return (
    <div className="d-flex flex-column align-item-center">
        <Lesson />
        <Keyboard />
    </div>
  );
};

export default Practice;
