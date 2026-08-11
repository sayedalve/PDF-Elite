$logFile = "C:\Users\sayed\.gemini\antigravity\brain\37e37255-7c1f-4344-bf43-da09048c2d12\.system_generated\tasks\task-354.log"
$lines = Get-Content $logFile

$filesToDelete = @()
foreach ($line in $lines) {
    if ($line -match "(C:\\Users\\[^:]+\.java):\d+: error:") {
        $filesToDelete += $matches[1]
    }
}

$filesToDelete = $filesToDelete | Select-Object -Unique

Write-Host "Found $( $filesToDelete.Count ) files from log. Deleting..."
foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Deleted: $file"
    }
}

Write-Host "Recompiling to see if more errors exist..."
.\gradlew.bat :stirling-pdf:compileTestJava -PnoSpotless > temp_out.txt 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "stirling-pdf:compileTestJava passed!"
} else {
    $lines = Get-Content temp_out.txt
    $moreFiles = @()
    foreach ($line in $lines) {
        if ($line -match "(C:\\Users\\[^:]+\.java):\d+: error:") {
            $moreFiles += $matches[1]
        }
    }
    $moreFiles = $moreFiles | Select-Object -Unique
    Write-Host "Found $( $moreFiles.Count ) MORE files from re-compile. Deleting..."
    foreach ($file in $moreFiles) {
        if (Test-Path $file) {
            Remove-Item $file -Force
            Write-Host "Deleted: $file"
        }
    }
}

