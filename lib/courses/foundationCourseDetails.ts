import type { CourseDetail, CourseExercise } from '@/lib/courses/types'

export type { CourseExercise }

export type FoundationCourseDetail = CourseDetail

export const foundationCourseDetails: Record<string, FoundationCourseDetail> = {
  'terminal-command-line': {
    id: 'terminal-command-line',
    title: 'Terminal & Command Line Mastery',
    description:
      'Moving beyond the mouse; navigation, file manipulation, and power-user shortcuts.',
    overview:
      'Build confidence in the terminal by practicing the commands you will use every day. Each check is a text-only validation (no commands are run).',
    outcomes: [
      'Navigate confidently with the core location and listing commands.',
      'Create, move, and rename files using single-line command chains.',
      'Recognize the most common flags for speed and accuracy.',
    ],
    exercises: [
      {
        id: 'terminal-pwd',
        title: 'Find Your Current Location',
        instruction: 'Print the full path of your current working directory.',
        details: [
          'Use a single command.',
          'Your answer should be the exact command you would type.',
        ],
        placeholder: 'Type the command here...',
        expected: {
          all: ['\\bpwd\\b'],
        },
        checkFor: ['pwd'],
        success: 'Nice. `pwd` prints the current directory path.',
        failure: 'Try using `pwd` to print the working directory.',
      },
      {
        id: 'terminal-ls',
        title: 'List All Files (Including Hidden)',
        instruction:
          'List files in long format and include hidden entries (those starting with a dot).',
        details: [
          'Use the `ls` command with flags.',
          'Order does not matter (e.g., `-la` or `-al`).',
        ],
        placeholder: 'Example: ls -la',
        expected: {
          all: ['\\bls\\b', '-a', '-l'],
        },
        checkFor: ['ls', '-a', '-l'],
        success: 'Great. Long listing + hidden files covered.',
        failure: 'Include both `-a` and `-l` flags with `ls`.',
      },
      {
        id: 'terminal-mkdir-touch',
        title: 'Create a Nested Folder and File',
        instruction:
          'Create the folder `projects/vibe` (including parent dirs) and a file named `notes.txt` inside it.',
        details: [
          'Use `mkdir -p` for nested folders.',
          'Create the file in the same line using `touch`.',
        ],
        placeholder: 'Example: mkdir -p projects/vibe && touch projects/vibe/notes.txt',
        expected: {
          all: [
            '\\bmkdir\\b',
            '-p',
            'projects\\/vibe',
            '\\btouch\\b',
            'projects\\/vibe\\/notes\\.txt',
          ],
        },
        checkFor: ['mkdir -p projects/vibe', 'touch projects/vibe/notes.txt'],
        success: 'Perfect. Folder + file created in one go.',
        failure: 'Use `mkdir -p` and `touch` with the exact path.',
      },
      {
        id: 'terminal-mv',
        title: 'Move and Rename a File',
        instruction:
          'Rename `notes.txt` to `ideas.txt` inside `projects/vibe`.',
        details: [
          'Use the `mv` command.',
          'Include both old and new filenames in your answer.',
        ],
        placeholder: 'Example: mv projects/vibe/notes.txt projects/vibe/ideas.txt',
        expected: {
          all: ['\\bmv\\b', 'notes\\.txt', 'ideas\\.txt'],
        },
        checkFor: ['mv', 'notes.txt', 'ideas.txt'],
        success: 'Nice. `mv` handles moves and renames.',
        failure: 'Use `mv` with both the old and new filenames.',
      },
    ],
  },
  'git-essentials': {
    id: 'git-essentials',
    title: 'Git Essentials',
    description: 'Local version control: init, add, commit, and status.',
    overview:
      'Practice the must-know Git commands that turn a folder into a versioned project. Keep answers as exact commands.',
    outcomes: [
      'Initialize a repository and inspect its current state.',
      'Stage and commit changes with descriptive messages.',
      'Review history quickly with compact log output.',
    ],
    exercises: [
      {
        id: 'git-init',
        title: 'Initialize a Repository',
        instruction: 'Initialize Git in the current folder.',
        details: [
          'Run this once at the start of a project.',
          'Use the Git command for initialization.',
        ],
        placeholder: 'Type the command here...',
        expected: {
          all: ['\\bgit\\s+init\\b'],
        },
        checkFor: ['git init'],
        success: 'Repo initialized. Good start.',
        failure: 'Use `git init` to initialize the repo.',
      },
      {
        id: 'git-status',
        title: 'Check Repository Status',
        instruction: 'Show the current status of your working tree.',
        details: [
          'This command shows staged, unstaged, and untracked files.',
        ],
        placeholder: 'Type the command here...',
        expected: {
          all: ['\\bgit\\s+status\\b'],
        },
        checkFor: ['git status'],
        success: 'Yes. Status is the first stop in any workflow.',
        failure: 'Use `git status` to see the working tree state.',
      },
      {
        id: 'git-add-commit',
        title: 'Stage and Commit',
        instruction:
          'Stage all changes and commit with a short message.',
        details: [
          'Include both `git add` and `git commit -m` in your answer.',
          'You can put them on one line using `&&` or `;`.',
        ],
        placeholder: 'Example: git add . && git commit -m "Add README"',
        expected: {
          all: ['\\bgit\\s+add\\b', '\\bgit\\s+commit\\b', '-m'],
        },
        checkFor: ['git add', 'git commit -m'],
        success: 'Great. Staged and committed with a message.',
        failure: 'Include both `git add` and `git commit -m`.',
      },
      {
        id: 'git-log',
        title: 'View Compact History',
        instruction: 'Show a one-line summary of commit history.',
        details: [
          'Use the log command with a compact flag.',
        ],
        placeholder: 'Example: git log --oneline',
        expected: {
          all: ['\\bgit\\s+log\\b', '--oneline'],
        },
        checkFor: ['git log', '--oneline'],
        success: 'Perfect. That gives a compact history view.',
        failure: 'Use `git log --oneline` for a compact list.',
      },
    ],
  },
  'github-collaboration': {
    id: 'github-collaboration',
    title: 'GitHub & Collaboration',
    description: 'Remote repos: push, pull, forking, and handling Pull Requests.',
    overview:
      'Connect your local repo to GitHub and practice the core collaboration commands you will use daily.',
    outcomes: [
      'Attach a remote repository and push your local work.',
      'Pull updates from the remote main branch.',
      'Create feature branches to keep work isolated.',
    ],
    exercises: [
      {
        id: 'github-remote',
        title: 'Add the Origin Remote',
        instruction:
          'Add a remote named `origin` that points to your GitHub repo URL.',
        details: [
          'Use `git remote add`.',
          'You can use either HTTPS or SSH URLs.',
        ],
        placeholder: 'Example: git remote add origin https://github.com/user/repo.git',
        expected: {
          all: ['\\bgit\\s+remote\\s+add\\b', 'origin'],
        },
        checkFor: ['git remote add', 'origin'],
        success: 'Remote added. You are linked to GitHub.',
        failure: 'Use `git remote add origin <url>`.',
      },
      {
        id: 'github-push',
        title: 'Push and Set Upstream',
        instruction:
          'Push your local main branch and set the upstream tracking branch.',
        details: [
          'Include a `git push` command.',
          'Use `-u` or `--set-upstream` with `origin`.',
        ],
        placeholder: 'Example: git push -u origin main',
        expected: {
          all: ['\\bgit\\s+push\\b', 'origin'],
          any: ['-u', '--set-upstream'],
        },
        checkFor: ['git push', 'origin', '-u (or --set-upstream)'],
        success: 'Nice. Upstream is set for future pushes.',
        failure: 'Include `git push` with `origin` and `-u`.',
      },
      {
        id: 'github-pull',
        title: 'Pull Latest Changes',
        instruction: 'Fetch and merge the latest changes from the remote.',
        details: [
          'Use `git pull` (optionally with `origin main`).',
        ],
        placeholder: 'Example: git pull origin main',
        expected: {
          all: ['\\bgit\\s+pull\\b'],
        },
        checkFor: ['git pull'],
        success: 'Great. That pulls the latest remote updates.',
        failure: 'Use `git pull` to update your local branch.',
      },
      {
        id: 'github-branch',
        title: 'Create a Feature Branch',
        instruction:
          'Create a new branch named `feature/readme` for isolated work.',
        details: [
          'Use either `git checkout -b` or `git switch -c`.',
        ],
        placeholder: 'Example: git switch -c feature/readme',
        expected: {
          all: ['feature\\/readme'],
          any: ['\\bgit\\s+checkout\\s+-b\\b', '\\bgit\\s+switch\\s+-c\\b'],
        },
        checkFor: ['git checkout -b or git switch -c', 'feature/readme'],
        success: 'Branch created. Nice isolation habit.',
        failure: 'Use `git checkout -b` or `git switch -c` with the branch name.',
      },
    ],
  },
  'merge-conflicts': {
    id: 'merge-conflicts',
    title: 'Solving Merge Conflicts',
    description: 'A dedicated deep dive into the "scariest" part of Git.',
    overview:
      'Merge conflicts are normal. Learn the command sequence to inspect, resolve, and finalize with confidence.',
    outcomes: [
      'Detect conflicts quickly and inspect them safely.',
      'Abort merges when you need to reset and retry.',
      'Finalize a clean resolution with a proper commit.',
    ],
    exercises: [
      {
        id: 'conflict-status',
        title: 'Check Conflict Status',
        instruction: 'Identify files in conflict after a merge.',
        details: [
          'Use the status command to see unmerged paths.',
        ],
        placeholder: 'Type the command here...',
        expected: {
          all: ['\\bgit\\s+status\\b'],
        },
        checkFor: ['git status'],
        success: 'Yes. Status shows which files are in conflict.',
        failure: 'Use `git status` to list unmerged paths.',
      },
      {
        id: 'conflict-diff',
        title: 'Inspect Conflict Markers',
        instruction: 'Preview conflict markers in the diff.',
        details: [
          'Use the diff command to review changes.',
        ],
        placeholder: 'Type the command here...',
        expected: {
          all: ['\\bgit\\s+diff\\b'],
        },
        checkFor: ['git diff'],
        success: 'Good. Diff is the quickest way to inspect conflicts.',
        failure: 'Use `git diff` to review conflict markers.',
      },
      {
        id: 'conflict-abort',
        title: 'Abort a Bad Merge',
        instruction: 'Abort the merge and go back to the pre-merge state.',
        details: [
          'Use the merge command with the abort flag.',
        ],
        placeholder: 'Example: git merge --abort',
        expected: {
          all: ['\\bgit\\s+merge\\b', '--abort'],
        },
        checkFor: ['git merge', '--abort'],
        success: 'Abort command is correct.',
        failure: 'Use `git merge --abort` to exit the merge.',
      },
      {
        id: 'conflict-commit',
        title: 'Stage and Commit the Resolution',
        instruction:
          'After resolving conflicts, stage your changes and commit with a message.',
        details: [
          'Include both `git add` and `git commit -m` in your response.',
        ],
        placeholder: 'Example: git add . && git commit -m "Resolve conflicts"',
        expected: {
          all: ['\\bgit\\s+add\\b', '\\bgit\\s+commit\\b', '-m'],
        },
        checkFor: ['git add', 'git commit -m'],
        success: 'Done. Your resolution is committed.',
        failure: 'Include `git add` plus `git commit -m`.',
      },
    ],
  },
  'markdown-for-devs': {
    id: 'markdown-for-devs',
    title: 'Markdown for Devs',
    description: 'Writing professional Documentation and README files.',
    overview:
      'Write clean Markdown that reads well on GitHub. Each answer can be multi-line.',
    outcomes: [
      'Structure a README with clear headings and lists.',
      'Add links and code blocks for clarity.',
      'Keep documentation readable and skimmable.',
    ],
    exercises: [
      {
        id: 'md-heading',
        title: 'Add a Project Title',
        instruction: 'Write a Markdown heading for a project title.',
        details: [
          'Use a level-1 heading (single `#`).',
          'Include any project name after it.',
        ],
        placeholder: 'Example: # VibeCodeee CLI',
        expected: {
          all: ['^\\s*#\\s+.+'],
        },
        checkFor: ['# Your Project Title'],
        success: 'Heading looks good.',
        failure: 'Use a `#` heading with a title after it.',
      },
      {
        id: 'md-list',
        title: 'Create a Bullet List',
        instruction: 'Write a short list of features using bullets.',
        details: [
          'Use `-`, `*`, or `+` for bullets.',
          'At least one list item is enough.',
        ],
        placeholder: 'Example: - Fast setup\n- Clean output',
        expected: {
          all: ['^\\s*[-*+]\\s+.+'],
        },
        checkFor: ['- item'],
        success: 'List formatting is correct.',
        failure: 'Start a line with `-`, `*`, or `+` followed by text.',
      },
      {
        id: 'md-link',
        title: 'Add a Link',
        instruction: 'Create a Markdown link to any URL.',
        details: [
          'Use the `[text](url)` format.',
        ],
        placeholder: 'Example: [Docs](https://example.com)',
        expected: {
          all: ['\\[[^\\]]+\\]\\((https?:\\/\\/[^\\)]+)\\)'],
        },
        checkFor: ['[text](https://...)'],
        success: 'Link format is correct.',
        failure: 'Use `[text](https://...)` for Markdown links.',
      },
      {
        id: 'md-code',
        title: 'Add a Code Block',
        instruction: 'Wrap a snippet in a fenced code block.',
        details: [
          'Use triple backticks before and after the code.',
          'Language hint is optional (e.g., ```bash).',
        ],
        placeholder: 'Example:\n```bash\nnpm run dev\n```',
        expected: {
          all: ['```'],
        },
        checkFor: ['``` code block ```'],
        success: 'Nice. The fence marks a code block.',
        failure: 'Use triple backticks to open and close the block.',
      },
    ],
  },
}

export const getFoundationCourseDetail = (courseId: string) =>
  foundationCourseDetails[courseId]
