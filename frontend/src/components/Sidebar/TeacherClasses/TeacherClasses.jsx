import React, { useEffect, useState } from 'react';
import {
	getMyClasses,
	getClassAnnouncements,
	deleteAnnouncement,
	deleteMyClass,
} from '../../../api/api';
import {
	BookOpen,
	Clock,
	Users,
	Megaphone,
	Trash2,
	Plus,
	AlertCircle,
	ChevronDown,
	ChevronUp,
	Calendar,
	User,
	Loader2,
	AlertTriangle,
} from 'lucide-react';
import CreateClassModal from '../Classes/CreateClassModal';
import CreateAnnouncementModal from './CreateAnnouncementModal';
import '../../../css/TeacherClasses.css';

const TeacherClasses = () => {
	const [classes,            setClasses]            = useState([]);
	const [loading,            setLoading]            = useState(true);
	const [error,              setError]              = useState(null);
	const [isModalOpen,        setIsModalOpen]        = useState(false);
	const [announcementTarget, setAnnouncementTarget] = useState(null);
	const [expandedClass,      setExpandedClass]      = useState(null);
	const [classAnnouncements, setClassAnnouncements] = useState({});
	const [annLoading,         setAnnLoading]         = useState({});
	const [annDeleteTarget,    setAnnDeleteTarget]    = useState(null);
	const [annDeleting,        setAnnDeleting]        = useState(false);
	const [deleteClassTarget,  setDeleteClassTarget]  = useState(null);
	const [deletingClass,      setDeletingClass]      = useState(false);

	const fetchMyClasses = async () => {
		try {
			setError(null);
			const res = await getMyClasses();
			setClasses(res.data);
		} catch {
			setError('Failed to load classes.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { fetchMyClasses(); }, []);

	const toggleAnnouncements = async (classId) => {
		if (expandedClass === classId) { setExpandedClass(null); return; }
		setExpandedClass(classId);
		setAnnLoading((prev) => ({ ...prev, [classId]: true }));
		try {
			const res = await getClassAnnouncements(classId);
			setClassAnnouncements((prev) => ({ ...prev, [classId]: res.data }));
		} catch {
			setClassAnnouncements((prev) => ({ ...prev, [classId]: [] }));
		} finally {
			setAnnLoading((prev) => ({ ...prev, [classId]: false }));
		}
	};

	const handleAnnouncementPosted = (classId) => {
		setAnnouncementTarget(null);
		setExpandedClass(null);
		setTimeout(() => toggleAnnouncements(classId), 50);
	};

	const handleDeleteAnnouncement = async () => {
		if (!annDeleteTarget) return;
		setAnnDeleting(true);
		try {
			await deleteAnnouncement(annDeleteTarget.class_id, annDeleteTarget.id);
			setClassAnnouncements((prev) => ({
				...prev,
				[annDeleteTarget.class_id]: prev[annDeleteTarget.class_id]?.filter(
					(a) => a.id !== annDeleteTarget.id,
				),
			}));
			setAnnDeleteTarget(null);
		} catch {
			setAnnDeleteTarget(null);
		} finally {
			setAnnDeleting(false);
		}
	};

	const handleDeleteClass = async () => {
		if (!deleteClassTarget) return;
		setDeletingClass(true);
		try {
			await deleteMyClass(deleteClassTarget.id);
			setClasses((prev) => prev.filter((c) => c.id !== deleteClassTarget.id));
			setDeleteClassTarget(null);
		} catch {
			setDeleteClassTarget(null);
		} finally {
			setDeletingClass(false);
		}
	};

	const formatDate = (ts) =>
		new Date(ts).toLocaleDateString(undefined, {
			year: 'numeric', month: 'short', day: 'numeric',
		});

	return (
		<main className='dashboard-container' aria-labelledby='teacher-classes-heading'>
			<header className='dashboard-header'>
				<div className='header-info'>
					<h1 id='teacher-classes-heading'>Your Managed Classes</h1>
					<p>Manage curriculum, announcements, and student rosters.</p>
				</div>
				<button onClick={() => setIsModalOpen(true)} className='create-btn' aria-label='Create new class'>
					<Plus size={20} />
					<span>Create New Class</span>
				</button>
			</header>

			{loading && (
				<section className='dashboard-grid'>
					{[...Array(6)].map((_, i) => (
						<div key={i} className='teacher-class-card skeleton-card' />
					))}
				</section>
			)}

			{error && (
				<div className='error-state' role='alert'>
					<AlertCircle size={20} />
					<span>{error}</span>
				</div>
			)}

			{!loading && !error && (
				<section className='dashboard-grid'>
					{classes.length > 0 ? (
						classes.map((c) => (
							<article key={c.id} className='teacher-class-card'>
								<div className='card-top'>
									<div className='icon-wrapper'>
										<BookOpen size={22} />
									</div>
									<button
										className='action-icon delete'
										onClick={() => setDeleteClassTarget(c)}
										aria-label={`Delete ${c.class_name}`}
									>
										<Trash2 size={15} />
										<span>Delete</span>
									</button>
								</div>

								<h3 className='class-title'>{c.class_name}</h3>

								<div className='class-meta'>
									<div className='meta-item'>
										<Clock size={16} />
										<span>{c.time_in_pakistan}:00 PKT</span>
									</div>
									<div className='meta-item'>
										<Users size={16} />
										<span>{c.student_count || 0} Students</span>
									</div>
								</div>

								<div className='card-buttons'>
									<button
										className='btn-roster'
										onClick={() => toggleAnnouncements(c.id)}
									>
										<Megaphone size={16} />
										Announcements
									</button>
									<button
										className='btn-post'
										onClick={() => setAnnouncementTarget(c)}
									>
										<Plus size={16} /> Post
									</button>
								</div>

								{expandedClass === c.id && (
									<div className='ann-panel'>
										<div className='ann-panel-header'>
											<span>Announcements</span>
											<button
												className='ann-panel-close'
												onClick={() => setExpandedClass(null)}
												aria-label='Close announcements'
											>
												<ChevronUp size={14} />
											</button>
										</div>

										{annLoading[c.id] && (
											<p className='ann-panel-loading'>Loading…</p>
										)}

										{!annLoading[c.id] && classAnnouncements[c.id]?.length === 0 && (
											<p className='ann-panel-empty'>No announcements yet. Use "Post" to add one.</p>
										)}

										{!annLoading[c.id] && classAnnouncements[c.id]?.length > 0 && (
											<ul className='ann-panel-list'>
												{classAnnouncements[c.id].map((ann) => (
													<li key={ann.id} className='ann-panel-item'>
														<div className='ann-panel-item-header'>
															<strong>{ann.title}</strong>
															<button
																className='ann-delete-btn'
																onClick={() => setAnnDeleteTarget({ ...ann, class_id: c.id })}
																aria-label={`Delete "${ann.title}"`}
																title='Delete announcement'
															>
																<Trash2 size={14} />
																<span>Delete</span>
															</button>
														</div>
														<p>{ann.content}</p>
														<div className='ann-panel-meta'>
															<span><User size={12} />{ann.teacher_name ?? 'You'}</span>
															<span><Calendar size={12} />{formatDate(ann.created_at)}</span>
														</div>
													</li>
												))}
											</ul>
										)}
									</div>
								)}
							</article>
						))
					) : (
						<div className='empty-dashboard'>
							<BookOpen size={48} />
							<h3>No Classes Yet</h3>
							<p>You haven't created any classes yet.</p>
							<button onClick={() => setIsModalOpen(true)} className='create-btn small'>
								<Plus size={16} /> Create Your First Class
							</button>
						</div>
					)}
				</section>
			)}

			{isModalOpen && (
				<CreateClassModal
					onClose={() => setIsModalOpen(false)}
					onSuccess={() => { setIsModalOpen(false); fetchMyClasses(); }}
				/>
			)}

			{announcementTarget && (
				<CreateAnnouncementModal
					classItem={announcementTarget}
					onClose={() => setAnnouncementTarget(null)}
					onSuccess={() => handleAnnouncementPosted(announcementTarget.id)}
				/>
			)}

			{annDeleteTarget && (
				<div className='modal-overlay' role='dialog' aria-modal='true'>
					<div className='confirm-modal'>
						<h3>Delete Announcement</h3>
						<p>Delete "<strong>{annDeleteTarget.title}</strong>"? This cannot be undone.</p>
						<div className='modal-actions'>
							<button className='btn-secondary' onClick={() => setAnnDeleteTarget(null)} disabled={annDeleting}>
								Cancel
							</button>
							<button className='btn-danger' onClick={handleDeleteAnnouncement} disabled={annDeleting}>
								{annDeleting ? <Loader2 size={15} className='ann-spinner' /> : <Trash2 size={15} />}
								{annDeleting ? 'Deleting…' : 'Delete'}
							</button>
						</div>
					</div>
				</div>
			)}

			{deleteClassTarget && (
				<div className='modal-overlay' role='dialog' aria-modal='true'>
					<div className='confirm-modal delete-class-modal'>
						<div className='delete-class-modal-icon'>
							<AlertTriangle size={26} />
						</div>
						<h3>Delete Class</h3>
						<p>
							You are about to permanently delete <strong>{deleteClassTarget.class_name}</strong>.
						</p>
						<ul className='delete-class-warning-list'>
							<li>All announcements for this class will be deleted</li>
							<li>All student enrollments will be removed</li>
							<li>This action cannot be undone</li>
						</ul>
						<div className='modal-actions'>
							<button className='btn-secondary' onClick={() => setDeleteClassTarget(null)} disabled={deletingClass}>
								Cancel
							</button>
							<button className='btn-danger' onClick={handleDeleteClass} disabled={deletingClass}>
								{deletingClass ? <Loader2 size={15} className='ann-spinner' /> : <Trash2 size={15} />}
								{deletingClass ? 'Deleting…' : 'Delete Class'}
							</button>
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default TeacherClasses;