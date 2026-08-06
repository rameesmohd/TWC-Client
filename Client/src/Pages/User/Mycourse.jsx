import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import { Progress } from 'antd'
import userAxios from '../../Axios/Useraxios'
import { toast } from 'react-hot-toast'
import { CheckOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import Classroom from './Classroom'
import Congrates from '../../Components/Common/Congrates'
import { useNavigate } from 'react-router-dom'
import { setCourseData } from '../../Redux/ClientSlice'
import { setFullData } from '../../Redux/CourseSlice'
import { logout } from '../../Redux/ClientSlice'

const Mycourse = () => {
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(true)
  const [classroomChapter, setClassroomChapter] = useState({})
  const [chapterIndex, setChapterIndex] = useState('')
  const [progress, setProgress] = useState(0)
  const axiosInstance = userAxios()
  const dispatch = useDispatch()
  const completedChapters = useSelector((store) => store.Client.completed_chapters)
  const course_data = useSelector((store) => store.Course.course_data)
  const userId = useSelector((state) => state.Client.user_id)
  const navigate = useNavigate()

  const signout = async () => {
    dispatch(logout())
  }

  console.log(course_data);

  const fetchCourseData = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/course')
      if (response.data.result && response.data.result.length) {
        setCourse(response.data.result)
        dispatch(setCourseData({
          is_purchased: response.data.user.is_purchased,
          completed_chapters: response.data.user.completed_chapters
        }))
        dispatch(setFullData(response.data.result))
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
      console.log(error);
      setLoading(false)
      signout()
    }
  }

  const handleChapterComplete = async () => {
    try {
      if (classroomChapter.title == 'Introduction') {
        setClassroomChapter({})
        return
      }

      const response = await axiosInstance.patch('/course', { chapterId: classroomChapter._id })
      console.log(response.data.result);
      dispatch(setCourseData({
        is_purchased: response.data.result.is_purchased,
        completed_chapters: response.data.result.completed_chapters
      }))
      if (progress < 100) {
        toast.success('Next chapter unlocked')
      }
      setClassroomChapter({})
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  function calculateProgress() {
    if (completedChapters.length === 0 || course.length === 0) {
      return 0;
    }
    return Math.floor((completedChapters.length / course.length) * 100)
  }

  useEffect(() => {
    if (course_data.length == 0) {
      fetchCourseData()
    } else {
      console.log('course : ', course);
      setCourse(course_data)
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
  }, [])

  useEffect(() => {
    setProgress(calculateProgress())
  }, [completedChapters, course])

  const nextChapterIndex = useMemo(() => {
    return course.findIndex((chapters, i) => {
      const unlocked = i === 0 || completedChapters.includes(course[i - 1]._id)
      return unlocked && !completedChapters.includes(chapters._id)
    })
  }, [course, completedChapters])

  const handleLockedClick = () => {
    toast('Complete the previous chapter to unlock this one.', { icon: '🔒' })
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main id="main-content" className="container mx-auto px-4 pb-16 pt-28 md:px-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            My Course
          </span>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Gold Specialised Course
          </h1>
        </div>
        <hr className="mt-4 border-gray-200" />

        {loading && (
          <div className="my-8 animate-pulse space-y-3">
            <div className="h-2 w-full rounded-full bg-gray-200" />
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-16 w-full rounded-2xl bg-gray-100" />
            ))}
          </div>
        )}

        {!loading && (
          !Object.keys(classroomChapter).length ? (
            <section className="my-8">
              {course.length ? (
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-6 md:col-span-2">
                    <div className="w-full sm:w-72">
                      <div className="mb-1 flex justify-between text-xs font-medium text-gray-500">
                        <span>Your progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress percent={progress} showInfo={false} strokeColor="#a3e635" trailColor="#f1f5f9" />
                    </div>

                    <div className="space-y-3">
                      {course.map((chapters, i) => {
                        const isCompleted = completedChapters.includes(chapters._id)
                        const isUnlocked = i === 0 || completedChapters.includes(course[i - 1]._id)
                        const isNext = i === nextChapterIndex

                        if (isCompleted) {
                          return (
                            <button
                              key={chapters._id}
                              type="button"
                              onClick={() => { setClassroomChapter(chapters); setChapterIndex(i + 1) }}
                              className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white px-5 py-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                            >
                              <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                                  <CheckOutlined />
                                </span>
                                <span className="font-medium text-gray-900">{i + 1}. {chapters.title}</span>
                              </div>
                              <span className="text-xs font-semibold text-emerald-600">Completed</span>
                            </button>
                          )
                        }

                        if (isUnlocked) {
                          return (
                            <button
                              key={chapters._id}
                              type="button"
                              onClick={() => { setClassroomChapter(chapters); setChapterIndex(i + 1) }}
                              className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 ${
                                isNext ? 'border-lime-300 bg-lime-50' : 'border-gray-100 bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                    isNext ? 'bg-lime-400 text-black' : 'bg-gray-100 text-gray-500'
                                  }`}
                                >
                                  <UnlockOutlined />
                                </span>
                                <span className="font-medium text-gray-900">{i + 1}. {chapters.title}</span>
                              </div>
                              {isNext && (
                                <span className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black">
                                  Continue
                                </span>
                              )}
                            </button>
                          )
                        }

                        return (
                          <button
                            key={chapters._id}
                            type="button"
                            onClick={handleLockedClick}
                            className="flex w-full cursor-not-allowed items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-left opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-400">
                                <LockOutlined />
                              </span>
                              <span className="font-medium text-gray-400">{i + 1}. {chapters.title}</span>
                            </div>
                            <span className="text-xs font-medium text-gray-400">Locked</span>
                          </button>
                        )
                      })}
                    </div>

                    {completedChapters.includes(course[course.length - 1]._id) && (
                      <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5">
                        <div>
                          <div className="text-lg font-bold text-emerald-700">Congratulations! 🎉</div>
                          <p className="text-sm text-emerald-600">You've completed the entire course.</p>
                        </div>
                        <Congrates />
                      </div>
                    )}
                  </div>

                  <aside className="hidden md:block">
                    <div className="sticky top-28 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                      <div className="text-sm font-semibold text-gray-900">Course Overview</div>
                      <div className="mt-4 space-y-3 text-sm text-gray-500">
                        <div className="flex justify-between">
                          <span>Total chapters</span>
                          <span className="font-semibold text-gray-900">{course.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completed</span>
                          <span className="font-semibold text-gray-900">{completedChapters.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Remaining</span>
                          <span className="font-semibold text-gray-900">
                            {course.length - completedChapters.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              ) : (
                <div className="mx-auto max-w-md py-16 text-center">
                  <img
                    className="mx-auto h-56"
                    src="https://img.freepik.com/free-vector/order-paying-contactless-payment-by-credit-card-order-basket-laptop-bank-card-male-online-customer-with-tablet-cartoon-character_335657-2563.jpg"
                    alt=""
                  />
                  <h2 className="mt-6 text-xl font-bold text-gray-900">
                    Your course cart is feeling pretty lonely
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Enroll in the Gold Specialised Course to start tracking your progress here.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/checkout')}
                    className="mt-6 rounded-full bg-lime-400 px-8 py-3 font-semibold text-black transition-colors hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2"
                  >
                    Purchase Our Course Now
                  </button>
                </div>
              )}
            </section>
          ) : (
            <Classroom
              chapter={classroomChapter}
              chapterIndex={chapterIndex}
              goBack={() => setClassroomChapter({})}
              handleChapterComplete={handleChapterComplete}
            />
          )
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Mycourse