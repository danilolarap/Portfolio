export default function VoxelCard({ project }) {
  return (
    <div className="mc-slot p-4 flex flex-col justify-between h-full bg-[#8b8b8b] text-[#2e2e2e]">
      <div>
        <div className="flex items-center justify-between mb-2 border-b-2 border-[#555555] pb-2">
          <span className="text-[8px] bg-[#373737] text-yellow-300 px-2 py-0.5 font-bold">
            {project.category}
          </span>
          <span className="text-[8px] font-bold text-black">{project.itemIcon}</span>
        </div>
        <h3 className="text-xs font-bold text-black mb-2">{project.title}</h3>
        <p className="text-[8px] text-[#222222] leading-relaxed mb-4">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="text-[7px] bg-[#555555] text-white px-1.5 py-0.5 font-bold">
              {tech}
            </span>
          ))}
        </div>
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mc-button block text-center py-2 text-[8px] font-bold uppercase no-underline w-full"
        >
          [ Inspeccionar Code ]
        </a>
      </div>
    </div>
  );
}