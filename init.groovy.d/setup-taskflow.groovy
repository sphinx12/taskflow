import jenkins.model.*
import hudson.security.*
import org.jenkinsci.plugins.workflow.job.*
import org.jenkinsci.plugins.workflow.cps.*
import hudson.plugins.git.*

println("=== TaskFlow Auto-Configuration Starting ===")
def instance = Jenkins.getInstance()

// 1. Configure Security (Unsecured for simple defense demo)
instance.setAuthorizationStrategy(new AuthorizationStrategy.Unsecured())
instance.save()
println("Jenkins security set to Unsecured for demo access")

// 2. Create or Update TaskFlow-Pipeline Job
def jobName = "TaskFlow-Pipeline"
def job = instance.getItem(jobName)
def gitRepo = "https://github.com/sphinx12/taskflow.git"
def branch = "master"
def scriptPath = "Jenkinsfile"

def scm = new GitSCM(gitRepo)
scm.branches = [new BranchSpec("*/" + branch)]
def flowDefinition = new CpsScmFlowDefinition(scm, scriptPath)
flowDefinition.setLightweight(true)

if (job == null) {
    println("Creating job: " + jobName)
    job = instance.createProject(WorkflowJob, jobName)
} else {
    println("Updating existing job: " + jobName)
}

job.setDefinition(flowDefinition)
job.save()
println("TaskFlow-Pipeline job successfully configured!")
println("=== TaskFlow Auto-Configuration Finished ===")
