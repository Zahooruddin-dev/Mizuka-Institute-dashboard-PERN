import { useEffect, useState } from 'react';
import {
	BookOpen,
	Clock,
	Megaphone,
	X,
	Calendar,
	User,
	AlertCircle,
	Loader2,
	GraduationCap,
	ChevronRight,
} from 'lucide-react';
import {
	getStudentEnrolledShedule,
	getClassAnnouncements,
} from '../../../api/api';
import '../../../css/Enrolled.css';

const Enrolled = ({ userId }) => {
	const [classes, setClasses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selected, setSelected] = useState(null);
	const [announcements, setAnnouncements] = useState([]);
	const [annLoading, setAnnLoading] = useState(false);

	useEffect(() => {
		const fetch = async () => {
			try {
				const res = await getStudentEnrolledShedule(userId);
				setClasses(res.data);
			} catch {
				setError('Failed to load enrolled classes.');
			} finally {
				setLoading(false);
			}
		};

		if (!userId) return;
		fetch();
	}, [userId]);

	const openClass = async (cls) => {
		setSelected(cls);
		setAnnouncements([]);
		setAnnLoading(true);
		try {
			const res = await getClassAnnouncements(cls.class_id ?? cls.id);
			setAnnouncements(res.data);
		} catch {
			setAnnouncements([]);
		} finally {
			setAnnLoading(false);
		}
	};

	const closeDrawer = () => setSelected(null);

	const formatDate = (ts) =>
		new Date(ts).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});

	return (
		<div className='enrolled-page'>
			<div className='enrolled-header'>
				<div className='enrolled-header-icon'>
					<GraduationCap size={26} />
				</div>
				<div>
					<h1>My Enrolled Classes</h1>
					<p>View your schedule, class details and announcements</p>
				</div>
			</div>

			{loading && (
				<div className='enrolled-loading'>
					<Loader2 size={28} className='enrolled-spinner' />
					<span>Loading your classes…</span>
				</div>
			)}

			{error && (
				<div className='enrolled-error' role='alert'>
					<AlertCircle size={17} />
					<span>{error}</span>
				</div>
			)}

			{!loading && !error && classes.length === 0 && (
				<div className='enrolled-empty'>
					<GraduationCap size={48} />
					<h3>Not enrolled in any classes yet</h3>
					<p>Head to the Class Directory to find and join a class.</p>
				</div>
			)}

			{!loading && !error && classes.length > 0 && (
				<ul className='enrolled-grid'>
					{classes.map((cls, i) => (
						<li
							key={cls.class_id ?? cls.id ?? i}
							className='enrolled-card'
							style={{ animationDelay: `${i * 60}ms` }}
							onClick={() => openClass(cls)}
						>
							<div className='enrolled-card-top'>
								<div className='enrolled-card-icon'>
									<BookOpen size={20} />
								</div>
								<ChevronRight size={16} className='enrolled-card-arrow' />
							</div>

							<h3>{cls.class_name}</h3>

							<div className='enrolled-card-meta'>
								{cls.time_in_pakistan && (
									<span>
										<Clock size={13} />
										{cls.time_in_pakistan}:00 PKT
									</span>
								)}
								{cls.enrollment_date && (
									<span>
										<Calendar size={13} />
										Joined {formatDate(cls.enrollment_date)}
									</span>
								)}
							</div>

							{cls.student_name && (
								<div className='enrolled-card-footer'>
									<User size={12} />
									<span>{cls.student_name}</span>
								</div>
							)}
						</li>
					))}
				</ul>
			)}

			{selected && (
				<>
					<div className='enrolled-overlay' onClick={closeDrawer} />
					<aside className='enrolled-drawer'>
						<div className='drawer-header'>
							<div className='drawer-header-left'>
								<div className='drawer-icon'>
									<BookOpen size={20} />
								</div>
								<div>
									<h2>{selected.class_name}</h2>
									{selected.time_in_pakistan && (
										<span className='drawer-schedule'>
											<Clock size={13} />
											{selected.time_in_pakistan}:00 PKT
										</span>
									)}
								</div>
							</div>
							<button
								className='drawer-close'
								onClick={closeDrawer}
								aria-label='Close'
							>
								<X size={20} />
							</button>
						</div>

						<div className='drawer-body'>
							<div className='drawer-detail-grid'>
								{selected.enrollment_date && (
									<div className='drawer-detail-item'>
										<label>
											<Calendar size={13} />
											Enrolled
										</label>
										<p>{formatDate(selected.enrollment_date)}</p>
									</div>
								)}
								{selected.student_name && (
									<div className='drawer-detail-item'>
										<label>
											<User size={13} />
											Student
										</label>
										<p>{selected.student_name}</p>
									</div>
								)}
							</div>

							<div className='drawer-ann-section'>
								<div className='drawer-ann-heading'>
									<Megaphone size={15} />
									<span>Announcements</span>
								</div>

								{annLoading && (
									<div className='drawer-ann-loading'>
										<Loader2 size={16} className='enrolled-spinner' />
										<span>Loading…</span>
									</div>
								)}

								{!annLoading && announcements.length === 0 && (
									<p className='drawer-ann-empty'>
										No announcements for this class yet.
									</p>
								)}

								{!annLoading && announcements.length > 0 && (
									<ul className='drawer-ann-list'>
										{announcements.map((ann) => (
											<li key={ann.id} className='drawer-ann-item'>
												<div className='drawer-ann-item-header'>
													<strong>{ann.title}</strong>
													<span className='drawer-ann-date'>
														{formatDate(ann.created_at)}
													</span>
												</div>
												<p>{ann.content}</p>
												<span className='drawer-ann-author'>
													<User size={12} />
													{ann.teacher_name ?? 'Instructor'}
												</span>
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
					</aside>
				</>
			)}
		</div>
	);
};

export default Enrolled;
