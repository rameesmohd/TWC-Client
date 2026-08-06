import { Button, Card, Progress, Tag, Tooltip } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  LeftOutlined,
  RightOutlined,
  PlayCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

const Classroom = ({ chapter, goBack, chapterIndex, handleChapterComplete }) => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [mainLoading, setMainLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState({}); // { [lessonId]: true }

  const selectedLesson = chapter.lessons[selectedLessonIndex];
  const isFirst = selectedLessonIndex === 0;
  const isLast = selectedLessonIndex === chapter.lessons.length - 1;

  const progressPct = useMemo(() => {
    const done = Object.keys(completedLessons).length;
    return Math.round((done / chapter.lessons.length) * 100);
  }, [completedLessons, chapter.lessons.length]);

  useEffect(() => {
    setMainLoading(true);
  }, [selectedLessonIndex]);

  const handleSelectLesson = (index) => {
    setSelectedLessonIndex(index);
  };

  const handleNext = () => {
    // mark current lesson watched when moving forward
    setCompletedLessons((prev) => ({ ...prev, [selectedLesson._id]: true }));
    if (!isLast) setSelectedLessonIndex((i) => i + 1);
  };

  const handlePrev = () => {
    if (!isFirst) setSelectedLessonIndex((i) => i - 1);
  };

  const onCompleteClick = () => {
    setCompletedLessons((prev) => ({ ...prev, [selectedLesson._id]: true }));
    handleChapterComplete();
  };

  return (
    <div className="animate-fade-left">
      {/* Header */}
      <div className="w-full my-2 flex items-center gap-3">
        <button
          onClick={goBack}
          className="border rounded-full p-2 text-lg hover:bg-gray-100 transition-colors"
          aria-label="Back to chapters"
        >
          <ArrowLeftOutlined />
        </button>
        <div className="flex-1">
          <p className="text-lg font-semibold leading-tight">
            {chapterIndex}. {chapter.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Progress
              percent={progressPct}
              size="small"
              showInfo={false}
              strokeColor="#000"
              className="w-32"
            />
            <span className="text-xs text-gray-500">
              {Object.keys(completedLessons).length}/{chapter.lessons.length} watched
            </span>
          </div>
        </div>
      </div>

      <div className="sm:grid grid-cols-8 gap-4 animate-fade-right sm:mb-8">
        {/* Main video */}
        <div className="col-span-6">
          <div className="sm:p-4">
            <div className="relative rounded-xl overflow-hidden bg-black">
              {mainLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                  <LoadingOutlined style={{ fontSize: 32, color: '#fff' }} spin />
                </div>
              )}
              <video
                key={selectedLesson?._id}
                className="w-full h-72 md:h-[564px] object-contain"
                src={selectedLesson?.lessonVideoUrl}
                controls
                autoPlay
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                onLoadedData={() => setMainLoading(false)}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mt-3">
              <p className="font-medium text-base">
                {chapterIndex}.{selectedLessonIndex + 1} {selectedLesson?.title || chapter.title}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center px-4 pb-4 mt-2">
            <Tooltip title="Previous lesson">
              <Button
                onClick={handlePrev}
                icon={<LeftOutlined />}
                size="large"
                disabled={isFirst}
                style={{ width: 50, backgroundColor: isFirst ? undefined : 'black', color: isFirst ? undefined : 'white' }}
              />
            </Tooltip>

            {!isLast ? (
              <Tooltip title="Next lesson">
                <Button
                  onClick={handleNext}
                  icon={<RightOutlined />}
                  size="large"
                  style={{ width: 50, backgroundColor: 'black', color: 'white' }}
                />
              </Tooltip>
            ) : (
              <Button
                onClick={onCompleteClick}
                icon={<CheckCircleOutlined />}
                size="large"
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                Mark Chapter Complete
              </Button>
            )}
          </div>
        </div>

        {/* Lesson list */}
        <div className="col-span-2 flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1">
          {chapter.lessons.map((lesson, i) => {
            const isActive = selectedLesson._id === lesson._id;
            const isDone = !!completedLessons[lesson._id];

            return (
              <Card
                key={lesson._id}
                onClick={() => handleSelectLesson(i)}
                bodyStyle={{ padding: 8 }}
                className={`animate-flip-up cursor-pointer transition-all border ${
                  isActive ? 'border-black ring-1 ring-black bg-slate-50' : 'border-gray-200'
                }`}
                hoverable
              >
                <div className="flex gap-3 items-center">
                  <div className="relative w-20 h-14 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
                    {/* poster frame instead of autoplaying every list video */}
                    <video
                      src={`${lesson.lessonVideoUrl}#t=0.5`}
                      preload="metadata"
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      {isDone ? (
                        <CheckCircleFilled style={{ color: '#22c55e', fontSize: 18 }} />
                      ) : (
                        <PlayCircleOutlined style={{ color: '#fff', fontSize: 18 }} />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isActive ? 'text-black' : 'text-gray-700'}`}>
                      {chapterIndex}.{i + 1} {lesson.title || chapter.title}
                    </p>
                    {isActive && <Tag color="black" className="mt-1">Now playing</Tag>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Classroom;