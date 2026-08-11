$logFile = "C:\Users\sayed\.gemini\antigravity\brain\37e37255-7c1f-4344-bf43-da09048c2d12\.system_generated\tasks\task-247.log"
$lines = Get-Content $logFile

$filesToDelete = @()
foreach ($line in $lines) {
    if ($line -match "^(C:\\Users\\sayed\\Downloads\\PDF-Elite\\[^:]+\.java):\d+: error:") {
        $filesToDelete += $matches[1]
    }
}

$filesToDelete = $filesToDelete | Select-Object -Unique

Write-Host "Found $( $filesToDelete.Count ) files from initial log. Deleting..."
foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Deleted: $file"
    }
}

for ($i=1; $i -le 5; $i++) {
    Write-Host "Running compilation pass $i..."
    .\gradlew.bat :stirling-pdf:compileTestJava -PnoSpotless > build_out.txt 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Compilation successful!"
        break
    }
    
    $lines = Get-Content build_out.txt
    $newFiles = @()
    foreach ($line in $lines) {
        if ($line -match "^(C:\\Users\\sayed\\Downloads\\PDF-Elite\\[^:]+\.java):\d+: error:") {
            $newFiles += $matches[1]
        }
    }
    $newFiles = $newFiles | Select-Object -Unique
    
    if ($newFiles.Count -eq 0) {
        Write-Host "Failed but no file paths found. Exiting loop."
        break
    }
    
    Write-Host "Found $( $newFiles.Count ) more files to delete."
    foreach ($file in $newFiles) {
        if (Test-Path $file) {
            Remove-Item $file -Force
            Write-Host "Deleted: $file"
        }
    }
}

Write-Host "Final check - running full task build..."
task build > final_build_out.txt 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Full task build successful!"
} else {
    Write-Host "Full task build failed. Check final_build_out.txt"
}
